export const truthy = (it) => !!it;

export function shrink(text, maxlen = 10, ell = "…") {
  if (text.length <= maxlen) return text;
  const charsToShow = maxlen - ell.length;
  const chars0 = Math.ceil(charsToShow / 2);
  const chars1 = Math.floor(charsToShow / 2);
  return text.substring(0, chars0) + ell + text.substring(text.length - chars1);
}

export async function digestMessage(message) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

const sanitize = (text) => text.replace(/[^\w-]/g, "_");

export const sanitizeFilenameAddUid = (filename) => {
  const uid = crypto.randomUUID().replace(/-/g, "").slice(0, 8);

  let root = filename;
  let ext = "";

  const lastDot = filename.lastIndexOf(".");

  if (lastDot !== -1 && lastDot !== 0) {
    root = filename.slice(0, lastDot);
    ext = filename.slice(lastDot + 1);
  }

  root = sanitize(root);
  ext = sanitize(ext);

  return `${root}-${uid}${ext ? "." + ext : ""}`;
};

export const investmentsToOptions = (invts) =>
  invts.map((invt) => ({
    label: formatInvestmentName(invt),
    value: invt.id,
  }));

export const filesToOptions = (files) =>
  files.map((file) => ({
    label: fileName(file),
    value: file.id,
  }));

const _byteFormat = Intl.NumberFormat("en", {
  style: "unit",
  unit: "byte",
  unitDisplay: "narrow",
  notation: "compact",
});

export const formatBytes = (byteSize) => _byteFormat.format(byteSize);

const dateOpts = {
  year: "numeric",
  month: "short",
  day: "2-digit",
};
const timeOpts = {
  hour: "2-digit",
  minute: "2-digit",
  // second: "2-digit",
  hour12: true,
};
const timeZoneOpts = {
  timeZone: "America/New_York",
  // timeZone: "Pacific/Honolulu",
  timeZoneName: "short",
};

export const formatDateOnly = (ISO_8601) =>
  new Date(ISO_8601).toLocaleString("en-US", {
    ...dateOpts,
  });

export const formatDateDefault = (ISO_8601) =>
  new Date(ISO_8601).toLocaleString("en-US");

export const formatDateTime = (ISO_8601) =>
  new Date(ISO_8601).toLocaleString("en-US", {
    ...dateOpts,
    ...timeOpts,
    ...timeZoneOpts,
  });

export const formatInvestmentName = (invt) =>
  `${invt.entity_name} - ${invt.invt_name} (${
    invt.invt_shares || invt.invt_shares_dm
  } shs)`;

export const zip = (...rows) =>
  rows[0].map((_, c) => rows.map((row) => row[c]));

// a title for a storage.objects row
export const fileName = (file) => file.path_tokens[file.path_tokens.length - 1];

// import { reject, equals } from "rambda";
// export const removeEmptyStrings = reject(equals(""));
export const nullify = (o) => {
  const x = {};
  for (let key in o) {
    x[key] = o[key] === "" ? null : o[key];
  }
  return x;
};
