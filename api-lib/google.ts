import { google } from "googleapis";

const { GMAIL_SENDER_KEY_SECRET } = process.env;
if (!GMAIL_SENDER_KEY_SECRET)
  throw new Error("GMAIL_SENDER_KEY_SECRET not set.");

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

export async function getGmail(user_email: string) {
  const auth = await authorize();
  auth.subject = user_email;
  return google.gmail({ version: "v1", auth });
}
