import nodemailer from "nodemailer";
import { truthy } from "../src/utils/index.js";
import { getGmail } from "./google.ts";

type UUID = string & { readonly brand: unique symbol };

type ThreadInfo = {
  threadId?: string;
  headers?: {
    "In-Reply-To": string;
    References: string;
  };
};

import { makeAddress } from "./base.ts";

export const makeSubject = (req_id: string) => `Support Request [${req_id}]`;

const transporter = nodemailer.createTransport({
  // https://nodemailer.com/transports/stream
  streamTransport: true,
  newline: "unix",
  buffer: true,
});

export function makeRawEmail(
  fields,
  threadInfo: ThreadInfo = {}
): Promise<string> {
  return new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        ...fields,
        headers: threadInfo.headers || {},
      },
      (err, info) => {
        if (err) return reject(err);
        // const { envelope, messageId, message } = info;
        resolve(
          Buffer.from(info.message)
            .toString("base64")
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "")
        );
      }
    );
  });
}

import { json } from "micro";
import { parse } from "url";
import type { SupabaseClient } from "@supabase/supabase-js";

import { requestTemplates, responseTemplates } from "./templates.ts";

export const bodyParser = (req) => {
  if (["POST", "PUT", "PATCH"].indexOf(req.method) !== -1) {
    return json(req); // returns Promise
  }
  // nested objects are not serialized in query and parse returns everything as string
  return parse(req.url, true).query;
};

// A real Google Workspace user to authorize as
const SENDER_USER = "amy@orthogonalthinker.com";

// The sender domain (and preferably, the name) must be as at:
// https://supabase.com/dashboard/project/_/auth/smtp
// The sender domain must be authorized at the SMTP provider:
// https://app.mailersend.com/domains/65qngkdvxwolwr12
const SENDER_EMAIL = "investors@orthogonalthinker.com";
const SENDER_NAME = "Orthogonal Investor Portal";
const sender = makeAddress(SENDER_EMAIL, SENDER_NAME);

const IP_LABEL_NAME = "Investor Portal";

async function sendEmail(
  recipient: string,
  subject: string,
  emailHtml: string,
  emailText: string,
  threadInfo: ThreadInfo = {}
) {
  const rawEmail = await makeRawEmail(
    {
      from: sender,
      to: recipient,
      subject: subject,
      text: emailText,
      html: emailHtml,
      // attachments: [], // https://nodemailer.com/message/attachments
    },
    threadInfo
  );

  const gmail = await getGmail(SENDER_USER);

  // const insertResponse = await gmail.users.messages.insert({
  //   userId: "me",
  //   requestBody: {
  //     rawEmail,
  //     labelIds: ["SENT"],
  //   },
  // });

  const ipLabelId = await fetchGmailLabelByName(IP_LABEL_NAME, gmail);

  const threadId = threadInfo.threadId || undefined;

  // NOTE: Can not add my labels users.messages.send. Gmail ignores labelIds at this point. Labels can only be applied after sending via users.messages.modify.
  const labelIds = []; // "SENT", "UNREAD", ipLabelId

  // Trying to send with threadId. If it is removed, sending without it.
  const sendResponse = await gmail.users.messages
    .send({
      userId: "me",
      requestBody: { raw: rawEmail, labelIds, threadId },
    })
    .catch((err) => {
      if (err.code === 404 && threadId) {
        console.error("Missing thread while sending:", err.message);
        return gmail.users.messages.send({
          userId: "me",
          requestBody: { raw: rawEmail, labelIds },
        });
      }
      if (err.code === 400 && err.message?.includes(IP_LABEL_NAME)) {
        console.error("Missing or invalid label while sending:", err.message);
        return gmail.users.messages.send({
          userId: "me",
          requestBody: { raw: rawEmail, threadId },
        });
      }
      throw err;
    });
  const { data } = sendResponse;
  // const { id: gmailMessageId, threadId: newThreadId } = sendResponse.data;
  const gmailMessageId = data.id || "";
  const newThreadId = data.threadId;

  // NOTE: The email is sent at this point. However, do not end
  // the response right away, only do it when everything is finished,
  // else the process will be killed prematurely.

  const headers = await getMessageHeaders(gmail, gmailMessageId);

  // Sometimes label modification needs <.5s cooldown to be effective
  // await sleep(500);

  // Add UNREAD and the custom label
  const modifyResponse = await gmail.users.messages.modify({
    userId: "me",
    id: gmailMessageId,
    requestBody: {
      addLabelIds: ["UNREAD", ipLabelId],
    },
  });

  return { rawEmail, headers };
}

async function fetchGmailLabelByName(labelName: string, gmail) {
  const res = await gmail.users.labels.list({ userId: "me" });
  const labels = res.data["labels"] || [];
  const label = labels.find((label) => label.name === labelName);
  return label?.id || null;
}

type EmailHeaders = (typeof colToHeader)[keyof typeof colToHeader];
type EmailHeadersMapExt = Record<string, string> &
  Partial<Record<EmailHeaders, string>>;

// NOTE: Sync Vercel <-> Google Cloud Function
// DB column -> Email header - all the headers needed stored in public.messages
export const colToHeader = {
  header_from: "From",
  header_to: "To",
  header_date: "Date",
  header_subject: "Subject",
  header_message_id: "Message-ID",
  header_in_reply_to: "In-Reply-To",
  header_references: "References",
  // X-Gmail-Thread-ID does not exist on emails, but we will populate gmail_thread_id manually:
  gmail_thread_id: "X-Gmail-Thread-ID",
};

const getHeaderFromResponse = (
  name: string,
  headers: { name: string; value: string }[]
) => headers.find((h) => h.name.toLowerCase() === name.toLowerCase())?.value;

async function getMessageHeaders(
  gmail,
  gmailMessageId
): Promise<EmailHeadersMapExt> {
  const res = await gmail.users.messages.get({
    userId: "me",
    id: gmailMessageId,
    format: "metadata",
    metadataHeaders: Object.values(colToHeader),
  });
  const { headers } = res.data.payload;

  const result = Object.values(colToHeader).reduce((result, name) => {
    result[name] = getHeaderFromResponse(name, headers);
    return result;
  }, {});
  result["X-Gmail-Thread-ID"] = res.data.threadId;
  return result;
}

/*
async function getMessageId(gmail, gmailMessageId) {
  const res = await gmail.users.messages.get({
    userId: "me",
    id: gmailMessageId,
    format: "metadata",
    metadataHeaders: ["Message-ID"],
  });
  return getHeaderFromResponse("Message-ID", res.data.payload.headers);
}
*/

export function sendEmail_forRequest(payload, threadInfo = {}) {
  const { profile, req_id, req_short_id } = payload; // TODO Fetch and attach files
  const recipient = makeAddress(profile.email, profile.name);
  const subject = makeSubject(req_short_id);
  const [emailHtml, emailText] = requestTemplates(subject, payload);
  return sendEmail(recipient, subject, emailHtml, emailText, threadInfo); // async
}

export function sendEmail_forResponse(payload, threadInfo = {}) {
  const { profile, req_id, req_short_id } = payload; // TODO Fetch and attach files
  const recipient = makeAddress(profile.email, profile.name);
  const subject = makeSubject(req_short_id);
  const [emailHtml, emailText] = responseTemplates(`Re: ${subject}`, payload);
  return sendEmail(recipient, subject, emailHtml, emailText, threadInfo); // async
}

export function insertMessage(
  request_id: UUID,
  headers: EmailHeadersMapExt,
  rawEmail: string,
  supabaseClient: SupabaseClient
) {
  const messageRow = { request_id, message: rawEmail };
  for (let col in colToHeader) {
    messageRow[col] = headers[colToHeader[col]];
  }
  return supabaseClient.from("messages").insert(messageRow);
}

export async function getThreadInfo(req_id, supabase): Promise<ThreadInfo> {
  const lastMessageSelect = await supabase
    .from("messages")
    .select("*")
    .eq("request_id", req_id)
    .order("created_at", { ascending: false })
    .limit(1) // should not be necessary
    .single();
  const lastMessage = lastMessageSelect.data;
  const threadInfo = lastMessage
    ? {
        threadId: lastMessage.gmail_thread_id,
        headers: {
          "In-Reply-To": lastMessage.header_message_id,
          References: [
            lastMessage.header_references,
            lastMessage.header_message_id,
          ]
            .filter((it) => !!it)
            .join(" "),
        },
      }
    : {};
  return threadInfo;
}
