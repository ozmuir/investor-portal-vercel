import { truthy } from "../src/utils/index.js";
import {
  curlyBraces,
  type Profile,
  type RequestStatus,
  type UUID,
} from "./base.ts";

export const requestTemplates = (subject, data: RequestEmailArgs) => [
  tHtmlDocument(subject, tHtmlRequest(data)),
  tTextDocument(tTextRequest(data)),
];

export const responseTemplates = (subject, data: ResponseEmailArgs) => [
  tHtmlDocument(subject, tHtmlResponse(data)),
  tTextDocument(tTextResponse(data)),
];

export const tTextDocument = (textBody: string) => textBody;

export const tHtmlDocument = (subject: string, htmlBody: string) => `\
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>${subject}</title>
  </head>
  <body>
${htmlBody}
  </body>
</html>`;

export const tTextRequest = (vars: RequestEmailArgs) =>
  [
    GREETINGS + "\n" + RECEIVED,
    "---",
    vars.req_summary,
    vars.req_details,
    vars.invt_id_.length
      ? tTextSection(
          "Related Investments",
          vars.invt_id_.map(curlyBraces).join("\n")
        )
      : "",
    vars.file_id_.length
      ? tTextSection(
          "Related Documents",
          vars.file_id_.map(curlyBraces).join("\n")
        )
      : "",
    tTextRequestFooter(vars.req_id),
  ]
    .filter(truthy)
    .join("\n\n");

export const tHtmlRequest = (vars: RequestEmailArgs) =>
  [
    GREETINGS + "<br />" + RECEIVED,
    "<hr />",
    tHtmlMargin(tHtmlPreWrap(vars.req_summary)),
    tHtmlMargin(tHtmlPreWrap(vars.req_details)),
    vars.invt_id_.length
      ? tHtmlSection(
          "Related investments",
          vars.invt_id_.map(curlyBraces).join("<br />")
        )
      : "",
    vars.file_id_.length
      ? tHtmlSection(
          "Related documents",
          vars.file_id_.map(curlyBraces).join("<br />")
        )
      : "",
    tHtmlRequestFooter(vars.req_id),
  ]
    .filter(truthy)
    .join();

const GREETINGS = "Hello,";
const RECEIVED =
  "We’ve received your request and are currently processing it. Please allow us some time to review.";
const REPLY = "Please reply to this email to continue your request.";

const tKeyVal = (key: string, val: string) => `${key}: ${val}`;

const tHtmlMargin = (text: string) =>
  `<div style="margin-bottom: 1em">${text}</div>`;

const tHtmlPreWrap = (text: string) =>
  `<div style="white-space: pre-wrap">${text}</div>`;

const tHtmlHeading = (text: string) =>
  `<div><b>${text.toUpperCase()}</b></div>`;

const tTextHeading = (text: string) => `${text}:`;

const tHtmlSection = (head_text: string, body_text: string) =>
  tHtmlMargin(
    `\
${tHtmlHeading(head_text)}
${tHtmlPreWrap(body_text)}`
  );

const tTextSection = (head_text: string, body_text: string) => `\
${tTextHeading(head_text)}
${body_text}`;

const tHtmlRequestFooter = (req_id: UUID) => `
<hr />
<div style="font-size: 12px; color: #888;">
  <div>${tKeyVal("Request ID", curlyBraces(req_id))}</div>
  <div>${REPLY}</div>
</div>`;

const tTextRequestFooter = (req_id: UUID) => `\
-------------------------
${tKeyVal("Request ID", curlyBraces(req_id))}
${REPLY}`;

type RequestEmailArgs = {
  req_id: UUID;
  req_short_id: string;
  req_summary: string;
  req_details: string;
  invt_id_: UUID[];
  file_id_: UUID[];
};

type ResponseEmailArgs = {
  profile: Profile;
  req_id: UUID;
  res_status: RequestStatus;
  res_note: string;
};

export const tHtmlResponse = (vars: ResponseEmailArgs) => `\
${tKeyVal("Status", vars.res_status)}

${tHtmlPreWrap(vars.res_note)}

${tHtmlRequestFooter(vars.req_id)}`;

export const tTextResponse = (vars: ResponseEmailArgs) => `\
${tKeyVal("Status", vars.res_status)}

${vars.res_note}

${tTextRequestFooter(vars.req_id)}`;
