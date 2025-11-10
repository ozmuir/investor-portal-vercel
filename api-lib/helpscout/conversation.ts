import axios from "axios";
import { createHelpScoutAuth, requestNewToken } from "./auth.ts";
import { helpscoutEndpoint } from "./base.ts";

const { HELPSCOUT_MAILBOX_ID } = process.env;
if (!HELPSCOUT_MAILBOX_ID) throw new Error("HELPSCOUT_MAILBOX_ID not set.");

const SENDER_EMAIL = "investors@orthogonalthinker.com";

export async function createConversation(data) {
  //   const { subject, recipient } = data;

  // Must contain a valid customer id or an email address.
  const __customer = {
    email: "0zmuir@gmail.com",
    firstName: "Oz",
    lastName: "Muir",
  };

  const conversationData = {
    // https://developer.helpscout.com/mailbox-api/endpoints/conversations/create/#request-fields
    subject: `Support Request [${Date.now()}]`, // REQUIRED
    autoReply: true,
    type: "email", // REQUIRED
    mailboxId: HELPSCOUT_MAILBOX_ID, // REQUIRED
    status: "active", // REQUIRED
    customer: __customer, // REQUIRED
    // createdAt: "2012-10-10T12:00:00Z", // Date.toISOString() formats with millis but HelpScout does not accept it
    threads: [
      // REQUIRED at least one thread
      // https://developer.helpscout.com/mailbox-api/endpoints/conversations/create/#threads

      // {
      //   type: "customer", // REQUIRED // https://developer.helpscout.com/mailbox-api/endpoints/conversations/threads/customer/
      //   customer, // REQUIRED
      //   text: "Test 42 ?", // REQUIRED
      //   //   cc: ["0zmuir@gmail.com"],
      //   //   bcc: [SENDER_EMAIL],
      //   // attachments: [],
      // },

      // We have to use the "reply" thread type (not "customer" type)
      // to trigger the initial email to the customer from Help Scout
      {
        type: "reply", // REQUIRED // https://developer.helpscout.com/mailbox-api/endpoints/conversations/threads/reply/
        customer: __customer, // REQUIRED
        text: `zzz ${Date.now()}`, // REQUIRED
        status: "active",
        cc: [SENDER_EMAIL], // cc ourselves
        // bcc: [SENDER_EMAIL], // bcc prevents Help Scout from merging our replies to the same thread
      },
    ],
  };

  const withAuth = createHelpScoutAuth(requestNewToken);

  const result = await withAuth(async (access_token) => {
    const res = await axios.post(
      // https://developer.helpscout.com/mailbox-api/endpoints/conversations/create/
      helpscoutEndpoint("/v2/conversations"),
      conversationData,
      {
        timeout: 6000,
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return res.data;
  });

  return result;
}
