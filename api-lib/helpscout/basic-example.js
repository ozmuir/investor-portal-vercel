import axios from "axios";
import fs from "node:fs/promises";
import { inspect } from "../base.ts";
import { helpscoutEndpoint } from "./base.ts";

const { HELPSCOUT_MAILBOX_ID } = process.env;
if (!HELPSCOUT_MAILBOX_ID) throw new Error("HELPSCOUT_MAILBOX_ID not set.");

const { HELPSCOUT_ACCESS_KEY } = process.env;
if (!HELPSCOUT_ACCESS_KEY) throw new Error("HELPSCOUT_ACCESS_KEY not set.");

const { HELPSCOUT_SECRET_KEY } = process.env;
if (!HELPSCOUT_SECRET_KEY) throw new Error("HELPSCOUT_SECRET_KEY not set.");

const PATH = "./~helpscout.json";

const SENDER_NAME = "Orthogonal Investor Portal";
const SENDER_EMAIL = "investors@orthogonalthinker.com";

export async function createConversation({ subject, recipient } = {}) {
  const tokenData = await getTokenData();

  const axiosConfig = {
    timeout: 6000,
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  // Must contain a valid customer id or an email address.
  const customer = {
    email: "0zmuir@gmail.com",
    firstName: "Oz",
    lastName: "Muir",
  };

  const conversationData = {
    // https://developer.helpscout.com/mailbox-api/endpoints/conversations/create/#request-fields
    subject: "Support Request [AAA]", // REQUIRED
    autoReply: true,
    type: "email", // REQUIRED
    mailboxId: HELPSCOUT_MAILBOX_ID, // REQUIRED
    status: "active", // REQUIRED
    customer, // REQUIRED
    createdAt: "2012-10-10T12:00:00Z", // Date.toISOString() formats with millis but HelpScout does not accept it
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
        customer, // REQUIRED
        text: "zzz", // REQUIRED
        status: "active",
        cc: [SENDER_EMAIL], // copy ourselves
        // bcc: [SENDER_EMAIL], // this prevents Help Scout from merging our replies to the same thread
      },
    ],
  };

  try {
    const res = await axios.post(
      // https://developer.helpscout.com/mailbox-api/endpoints/conversations/create/
      helpscoutEndpoint("/v2/conversations"),
      conversationData,
      axiosConfig
    );

    return res.data;
  } catch (err) {
    // This token is valid for 2 days
    // and you should create a new one only after the existing token expires.
    // Expiration will be indicated by the API responding with HTTP 401.
    if (err.status === 401) {
      // TODO retry with new token once
    }
    console.error(err.message);
    console.error(err.response.status, err.response.statusText);
    console.error(inspect(err.response.data));
  }
}

async function getTokenData() {
  let tokenData;
  try {
    tokenData = JSON.parse(await fs.readFile(PATH, "utf8"));
  } catch (err) {
    console.warn(err.message);
  }
  if (!tokenData) {
    tokenData = await getNewTokenData();
    await fs.writeFile(PATH, JSON.stringify(tokenData), "utf8");
  }
  return tokenData;
}

async function getNewTokenData() {
  const res = await axios.post(
    helpscoutEndpoint("/v2/oauth2/token"),
    {
      grant_type: "client_credentials",
      client_id: HELPSCOUT_ACCESS_KEY,
      client_secret: HELPSCOUT_SECRET_KEY,
    },
    {
      timeout: 2000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  return res.data;
}
