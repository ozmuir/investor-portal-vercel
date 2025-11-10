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

const template_badge = (key, value) => `${key.toUpperCase()}: ${value}`;

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

const template_requestFooter_html = (req_short_id) => `
<hr />
<div style="font-size: 12px; color: #888;">
  <div>${template_badge("Request ID", req_short_id)}</div>
  <div>${REPLY}</div>
</div>
`;

const template_requestFooter_text = (req_short_id) => `
-------------------------
${template_badge("Request ID", req_short_id)}

${REPLY}
`;

export const requestTemplates = (
  subject,
  { req_id, req_short_id, req_summary, req_details, invt_id_, file_id_ }
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

${template_requestFooter_html(req_short_id)}
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

${template_requestFooter_text(req_short_id)}
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
