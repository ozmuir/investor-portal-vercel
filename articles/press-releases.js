const MAX_REDIRECTS = 5;
const CONCURRENCY = 3;
const TIMEOUT_MS = 5000;
const USER_AGENT = "Mozilla/5.0 (compatible; ContentFetcher/1.0)";

const matchToTag = {
  "/company/6544/": "Orthogonal Thinker",
  "/company/9636/": "Cloud3 Ventures",
};

import fs from "node:fs";
import axios from "axios";
import axiosRetry from "axios-retry";
import * as cheerio from "cheerio";
import { DateTime } from "luxon";
import pLimit from "p-limit";

axiosRetry(axios, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) =>
    axiosRetry.isNetworkOrIdempotentRequestError(error) ||
    error.response?.status === 429,
});

const readSource = (filePath, columns) =>
  fs
    .readFileSync(filePath, "utf8")
    .trim()
    .split(/\r?\n/)
    .map((line) => {
      const values = line.split(",").map((v) => v.trim());
      return Object.fromEntries(columns.map((key, i) => [key, values[i]]));
    });

function normWhitespace(s) {
  const lines = String(s || "")
    .replace(/\r/g, "")
    .split("\n")
    .map((l) => l.replace(/\s+/g, " ").trim());
  const out = [];
  for (const l of lines) {
    if (l === "" && out.at(-1) === "") continue;
    out.push(l);
  }
  return out.join("\n").trim();
}

async function fetchHtml(url, timeout, userAgent) {
  const res = await axios.get(url, {
    timeout,
    headers: {
      "User-Agent": userAgent,
      Accept: "text/html",
    },
    responseType: "text",
    maxRedirects: MAX_REDIRECTS,
    validateStatus: (s) => s >= 200 && s < 400,
  });
  return String(res.data);
}

function extract(html) {
  const $ = cheerio.load(html);

  const title = normWhitespace($("h1").first().text());

  const summary = normWhitespace($("h2").first().text()); //optional

  let date = "";
  const firstH1 = $("h1").first();
  if (firstH1.length) {
    const h3 = firstH1.nextAll("h3").first();
    const dateRaw = normWhitespace(h3.text().split("|")[0]);

    if (dateRaw) {
      const dt = parseDate(dateRaw);
      date = dt.toUTC().toISO();
    }
  }

  const body = $(
    `
    article >
      :not(header)
      :not(footer)
      :not(#contactInfo)
      :not(#corporateNewsLogoContainer)
      :not(#corporateLinkBack)
      :not(.tracker)
  `.replace(/\s+/g, "")
  )
    // Inner HTML: $(el).html()
    // Outer HTML: $.html(el)
    .map((_, el) => $.html(el))
    .get()
    .map(normWhitespace)
    .filter(Boolean)
    .join("\n\n");

  const tags = [];
  for (const [key, value] of Object.entries(matchToTag)) {
    if (html.includes(key)) {
      tags.push(value);
    }
  }

  return {
    date,
    title,
    summary,
    body,
    tags,
    //
  };
}

function parseDate(str) {
  const zoneAbbr = (str.match(/\b([A-Z]{2,3})T\b/i) || [])[1];
  const zone =
    {
      EST: "America/New_York",
      EDT: "America/New_York",
      PST: "America/Los_Angeles",
      PDT: "America/Los_Angeles",
    }[zoneAbbr + "T"] || "UTC";
  const cleaned = str.replace(/\s[A-Z]{2,3}T\b/i, "");
  // "October 07, 2025 9:31 AM EDT" -> Luxon Date
  return DateTime.fromFormat(cleaned, "LLLL dd, yyyy h:mm a", { zone });
}

export async function* scrapePressReleases(sourcePath, sourceCols) {
  let ok = 0;
  let bad = 0;
  const source = readSource(sourcePath, sourceCols);
  const limit = pLimit(CONCURRENCY);
  const pending = new Set(
    source.map(({ uuid, url }, idx) =>
      limit(async () => {
        try {
          const html = await fetchHtml(url, TIMEOUT_MS, USER_AGENT);
          const fields = extract(html);
          ok++;
          process.stdout.write(`✓ ${uuid}\n`);
          return { idx, value: { uuid, url, ...fields } };
        } catch (e) {
          bad++;
          process.stderr.write(`✗ ${uuid} — ${e?.message || e}\n`);
          return { idx, value: null };
        }
      })
    )
  );

  while (pending.size) {
    const { p, res } = await Promise.race(
      [...pending].map((p) => p.then((res) => ({ p, res })))
    );
    pending.delete(p);
    // yield only successful results
    if (res?.value) {
      yield res.value;
    }
  }

  console.log(`\nDONE: Press Releases fetched. Success: ${ok}, Failed: ${bad}.`);
}
