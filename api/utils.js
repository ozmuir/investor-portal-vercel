export const sleep = (timeout) =>
  new Promise((resolve, reject) => setTimeout(resolve, timeout));

//////////////////////////////
////////// auth.js //////////
//////////////////////////////

import { jwtVerify } from "jose";

const { SUPABASE_JWT_SECRET } = process.env;
if (!SUPABASE_JWT_SECRET) throw new Error("SUPABASE_JWT_SECRET not set.");

const secret = new TextEncoder().encode(SUPABASE_JWT_SECRET);

export const getToken = (req) => req.headers.authorization?.split(" ")[1];

export const verify = async (accessToken) => {
  const { payload } = await jwtVerify(accessToken, secret);
  return payload.sub;
};

/*
export const verifyRequest = async (req) => {
  return verify(getToken(req));
};
*/

export const getAuthenticatedUserIdOr401 = async (req, res) => {
  const accessToken = getToken(req);
  let userId;
  try {
    return verify(accessToken); // async
  } catch (err) {
    res.status(401).json({ error: err.message });
    return false;
  }
};

export const getIsAdminOr403 = async (req, res) => {
  const userId = await getAuthenticatedUserIdOr401(req, res);
  if (!userId) {
    return false;
  }

  const accessToken = getToken(req);
  const userClient = createUserClient(accessToken);

  const profileSelect = await userClient
    .from("profiles")
    .select("is_admin")
    .eq("user_id", userId) // IMPORTANT if using *ADMIN* client here
    .limit(1)
    .single();
  if (profileSelect.error) {
    res.status(400).json({ error: profileSelect.error.message });
    return false;
  }
  if (profileSelect.data.is_admin !== true) {
    res.status(403).json({ error: "Not an admin." });
    return false;
  }
  return true;
};

//////////////////////////////
////////// email.js //////////
//////////////////////////////

import nodemailer from "nodemailer";
import { truthy } from "../src/utils/index.js";

export const makeAddress = (email, name) =>
  [name ? `"${name}"` : "", `<${email}>`].filter(truthy).join(" ");

export const makeSubject = (req_id) => `Support Request [${req_id}][0htka23x]`;

const transporter = nodemailer.createTransport({
  // https://nodemailer.com/transports/stream
  streamTransport: true,
  newline: "unix",
  buffer: true,
});

export function makeRawEmail(fields, threadInfo = {}) {
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

export const bodyParser = (req) => {
  if (["POST", "PUT", "PATCH"].indexOf(req.method) !== -1) {
    return json(req); // returns Promise
  }
  // nested objects are not serialized in query and parse returns everything as string
  return parse(req.url, true).query;
};

// The sender domain (and preferably, the name) must be as at:
// https://supabase.com/dashboard/project/_/auth/smtp
// The sender domain must be authorized at the SMTP provider:
// https://app.mailersend.com/domains/65qngkdvxwolwr12
const SENDER_EMAIL = "investors@orthogonalthinker.com";
const SENDER_NAME = "Orthogonal Investor Portal";
const sender = makeAddress(SENDER_EMAIL, SENDER_NAME);
const LABEL_ID = "Investor Portal";

async function sendEmail(
  recipient,
  subject,
  emailHtml,
  emailText,
  threadInfo = {}
) {
  const raw = await makeRawEmail(
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

  const gmail = await getGmail(SENDER_EMAIL);

  // const insertResponse = await gmail.users.messages.insert({
  //   userId: "me",
  //   requestBody: {
  //     raw,
  //     labelIds: ["SENT"],
  //   },
  // });

  const threadId = threadInfo.threadId || undefined;
  const labelIds = [/* "SENT", "UNREAD", */ LABEL_ID]; // CAN NOT add UNREAD this way

  // Trying to send with threadId. If it is removed, sending without it.
  const sendResponse = await gmail.users.messages
    .send({
      userId: "me",
      requestBody: { raw, labelIds, threadId },
    })
    .catch((err) => {
      if (err.code === 404 && threadId) {
        console.error("Missing thread while sending:", err.message);
        return gmail.users.messages.send({
          userId: "me",
          requestBody: { raw, labelIds },
        });
      }
      if (err.code === 400 && err.message?.includes(LABEL_ID)) {
        console.error("Missing or invalid label while sending:", err.message);
        return gmail.users.messages.send({
          userId: "me",
          requestBody: { raw, threadId },
        });
      }
      throw err;
    });
  const { id: gmailMessageId, threadId: newThreadId } = sendResponse.data;

  // NOTE: The email is sent at this point. However, do not end
  // the response right away, only do it when everything is finished,
  // else the process will be killed prematurely.

  const headers = await getMessageHeaders(gmail, gmailMessageId);

  // Sometimes label modification needs <.5s cooldown to be effective
  // await sleep(500);

  // Add UNREAD
  const modifyResponse = await gmail.users.messages.modify({
    userId: "me",
    id: gmailMessageId,
    requestBody: {
      addLabelIds: ["UNREAD"],
    },
  });

  return { raw, headers };
}

export const emailHeaders = {
  // all the headers needed for the public.messages table
  // DB column -> Email header
  header_from: "From",
  header_to: "To",
  header_date: "Date",
  header_subject: "Subject",
  header_message_id: "Message-ID",
  header_in_reply_to: "In-Reply-To",
  header_references: "References",
  // the header "X-Gmail-Thread-ID" does not exist, but we will populate the column "gmail_thread_id" manually:
  gmail_thread_id: "X-Gmail-Thread-ID",
};

const getHeaderFromResponse = (name, headers) =>
  headers.find((h) => h.name.toLowerCase() === name.toLowerCase())?.value;

async function getMessageHeaders(gmail, gmailMessageId) {
  const res = await gmail.users.messages.get({
    userId: "me",
    id: gmailMessageId,
    format: "metadata",
    metadataHeaders: Object.values(emailHeaders),
  });
  const { headers } = res.data.payload;
  const result = Object.values(emailHeaders).reduce((result, name) => {
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
  const { profile, req_id } = payload; // TODO Fetch and attach files
  const recipient = makeAddress(profile.email, profile.name);
  const subject = makeSubject(req_id);
  const [emailHtml, emailText] = requestTemplates(subject, payload);
  return sendEmail(recipient, subject, emailHtml, emailText, threadInfo); // async
}

export function sendEmail_forResponse(payload, threadInfo = {}) {
  const { profile, req_id } = payload; // TODO Fetch and attach files
  const recipient = makeAddress(profile.email, profile.name);
  const subject = makeSubject(req_id);
  const [emailHtml, emailText] = responseTemplates(`Re: ${subject}`, payload);
  return sendEmail(recipient, subject, emailHtml, emailText, threadInfo); // async
}

export async function getThreadInfo(req_id, supabase) {
  const lastMessageSelect = await supabase
    .from("messages")
    .select("*")
    .eq("request_id", req_id)
    .order("created_at", { ascending: false })
    .limit(1)
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

//////////////////////////////
////////// google.js //////////
//////////////////////////////

import { google } from "googleapis";

const { GMAIL_SENDER_KEY_SECRET } = process.env;
if (!GMAIL_SENDER_KEY_SECRET) throw new Error("GMAIL_SENDER_KEY_SECRET not set.");

const credentials = JSON.parse(
  Buffer.from(GMAIL_SENDER_KEY_SECRET, "base64").toString("utf8")
);

const scopes = [
  // "https://www.googleapis.com/auth/gmail.insert",
  "https://www.googleapis.com/auth/gmail.modify",
  "https://www.googleapis.com/auth/gmail.send",
];

function authorize() {
  return new google.auth.GoogleAuth({ credentials, scopes }).getClient(); // async
}

export async function getGmail(user_email) {
  const auth = await authorize();
  auth.subject = user_email;
  return google.gmail({ version: "v1", auth });
}

//////////////////////////////
////////// supabase.js //////////
//////////////////////////////

import { createClient } from "@supabase/supabase-js";

const { SUPABASE_URL } = process.env;
if (!SUPABASE_URL) throw new Error("SUPABASE_URL not set.");

const { SUPABASE_ANON_KEY } = process.env;
if (!SUPABASE_ANON_KEY) throw new Error("SUPABASE_ANON_KEY not set.");

const { SUPABASE_SERVICE_ROLE_KEY } = process.env;
if (!SUPABASE_SERVICE_ROLE_KEY)
  throw new Error("SUPABASE_SERVICE_ROLE_KEY not set.");

export const createUserClient = (accessToken) =>
  createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: { headers: { Authorization: `Bearer ${accessToken}` } },
  });

export const createAdminClient = () =>
  createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

//////////////////////////////
////////// templates.js //////////
//////////////////////////////

const RECEIVED =
  "We’ve received your request and are currently processing it. Please allow us some time to review.";
const REPLY =
  "Update your request on the Investor Portal, or reply to this email to continue your request.";

const template_html = (subject, htmlBody) => `
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>${subject}</title>
  </head>
  <body>
${htmlBody}
  </body>
</html>
`;

const template_badge = (key, value) => `[${key.toUpperCase()}: ${value}]`;

const template_margin_html = (text) =>
  `<div style="margin-bottom: 1em">${text}</div>`;

const template_preWrap_html = (text) =>
  `<div style="white-space: pre-wrap">${text}</div>`;

const template_heading_html = (text) => `
<div><b>${text.toUpperCase()}</b></div>
`;

const template_heading_text = (text) => `
=========================
${text.toUpperCase()}
=========================
`;

const template_section_html = (head_text, body_text) =>
  template_margin_html(
    `
${template_heading_html(head_text)}
${template_preWrap_html(body_text)}
`
  );

const template_section_text = (head_text, body_text) => `
${template_heading_text(head_text)}
${body_text}
`;

const template_requestFooter_html = (req_id) => `
<hr />
<div style="font-size: 12px; color: #888;">
  <div>${template_badge("Request ID", req_id)}</div>
  <div>${REPLY}</div>
</div>
`;

const template_requestFooter_text = (req_id) => `
-------------------------
${template_badge("Request ID", req_id)}

${REPLY}
`;

export const requestTemplates = (
  subject,
  { req_id, req_summary, req_details, invt_id_, file_id_ }
) => [
  template_html(
    subject,
    `
${template_margin_html(RECEIVED)}

${req_summary ? template_section_html("Summary", req_summary) : ""}

${req_details ? template_section_html("Details", req_details) : ""}

${
  invt_id_.length
    ? template_section_html("Related investment ID(s)", invt_id_.join("<br />"))
    : ""
}

${
  file_id_.length
    ? template_section_html("Related document ID(s)", file_id_.join("<br />"))
    : ""
}

${template_requestFooter_html(req_id)}
`
  ),

  `
${RECEIVED}

${req_summary ? template_section_text("Summary", req_summary) : ""}
${req_details ? template_section_text("Details", req_details) : ""}
${
  invt_id_.length
    ? template_section_text("Related Investment ID(s)", invt_id_.join("\n"))
    : ""
}
${
  file_id_.length
    ? template_section_text("Related Document ID(s)", file_id_.join("\n"))
    : ""
}

${template_requestFooter_text(req_id)}
`,
];

export const responseTemplates = (
  subject,
  { profile, req_id, res_status, res_note }
) => [
  template_html(
    subject,
    `
${template_badge("Status", res_status)}

${template_preWrap_html(res_note)}

${template_requestFooter_html(req_id)}
`
  ),

  `
${template_badge("Status", res_status)}

${res_note}

${template_requestFooter_text(req_id)}
`,
];
