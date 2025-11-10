import axios from "axios";
import { createHelpScoutAuth, requestNewToken } from "./auth.ts";
import { helpscoutEndpoint } from "./base.ts";
import { SENDER_EMAIL } from "../base.ts";

const { HELPSCOUT_MAILBOX_ID } = process.env;
if (!HELPSCOUT_MAILBOX_ID) throw new Error("HELPSCOUT_MAILBOX_ID not set.");

type ConversationStatus = "active" | "closed" | "pending";
type ReplyThreadStatus =
  | "active"
  | "all"
  | "closed"
  | "open"
  | "pending"
  | "spam";
type ConversationId = string & { readonly brand: unique symbol }; // '3135619798'
type ThreadId = string & { readonly brand: unique symbol }; // '9554328511'

type Customer = {
  email: string;
  firstName?: string;
  lastName?: string;
};

export async function startConversation({
  recipient,
  subject,
  body,
}: {
  recipient: Customer;
  subject: string;
  body: string;
}) {
  // https://developer.helpscout.com/mailbox-api/endpoints/conversations/create/
  const createConversationUrl = helpscoutEndpoint("/v2/conversations");
  const createThreadPayload =
    // {
    //   type: "customer", // REQUIRED // https://developer.helpscout.com/mailbox-api/endpoints/conversations/threads/customer/
    //   customer, // REQUIRED
    //   text: "Test 42 ?", // REQUIRED
    //   //   cc: ["0zmuir@gmail.com"],
    //   //   bcc: [SENDER_EMAIL],
    //   // attachments: [],
    // },

    // Normally, a thread of { type: "customer" } is used to create a thread.
    // But we use { type: "reply" } to trigger the initial email to the customer from Help Scout.
    // TODO
    // We should try { type: "customer" } and cc the customer instead of us
    // - see if both sides receive their emails
    // If that does not work, try cc both the customer and us
    {
      type: "reply", // REQUIRED // https://developer.helpscout.com/mailbox-api/endpoints/conversations/threads/reply/
      customer: recipient, // REQUIRED
      text: body, // REQUIRED
      status: "active" as ReplyThreadStatus,
      cc: [SENDER_EMAIL], // cc ourselves
      // bcc: [SENDER_EMAIL], // bcc prevents Help Scout from merging our replies to the same thread
      // TODO
      // attachments: [
      //   {
      //     fileName: "file.txt",
      //     mimeType: "plain/text",
      //     data: "ZmlsZQ==",
      //   },
      // ],
    };
  const createConversationPayload = {
    // https://developer.helpscout.com/mailbox-api/endpoints/conversations/create/
    subject, // REQUIRED
    autoReply: true,
    type: "email", // REQUIRED
    mailboxId: HELPSCOUT_MAILBOX_ID, // REQUIRED
    status: "active" as ConversationStatus, // REQUIRED
    customer: recipient, // REQUIRED // Must contain a valid customer id or an email address.
    threads: [createThreadPayload], // REQUIRED at least one thread
  };

  const withAuth = createHelpScoutAuth(requestNewToken);
  const result = await withAuth(async (access_token) => {
    const res = await axios.post(
      createConversationUrl,
      createConversationPayload,
      makeHeaders(access_token)
    );
    const conversationId = res.headers["resource-id"];
    // const conversationLocation = res.headers["location"]; // https://api.helpscout.net/v2/conversations/123
    // const conversationWebLocation = res.headers["web-location"]; // https://secure.helpscout.net/conversation/123/89
    if (!conversationId) {
      throw new Error(
        "Missing Help Scout conversation ID in response headers."
      );
    }
    return conversationId as ConversationId;
  });

  return result;
}

export async function addToConversation({
  conversationId,
  recipient,
  body,
}: {
  conversationId: string;
  recipient: Customer;
  body: string;
}) {
  // https://developer.helpscout.com/mailbox-api/endpoints/conversations/threads/reply/
  const createReplyThreadUrl = helpscoutEndpoint(
    `/v2/conversations/${conversationId}/reply`
  );
  const createReplyThreadPayload = {
    customer: recipient,
    text: body,
    status: "active" as ReplyThreadStatus, // "If not explicitly set, a reply thread will reactivate the conversation."
    cc: [SENDER_EMAIL], // cc ourselves
    // bcc: [SENDER_EMAIL], // bcc prevents Help Scout from merging our replies to the same thread
    // TODO
    // attachments: [
    //   {
    //     fileName: "file.txt",
    //     mimeType: "plain/text",
    //     data: "ZmlsZQ==",
    //   },
    // ],
  };
  const withAuth = createHelpScoutAuth(requestNewToken);
  const result = await withAuth(async (access_token) => {
    const res = await axios.post(
      createReplyThreadUrl,
      createReplyThreadPayload,
      makeHeaders(access_token)
    );
    const threadId = res.headers["resource-id"];
    if (!threadId) {
      throw new Error("Missing Help Scout thread ID in response headers.");
    }
    return threadId as ThreadId;
  });

  return result;
}

const makeHeaders = (access_token: string) => ({
  timeout: 6000,
  headers: {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
