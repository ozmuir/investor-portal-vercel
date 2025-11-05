#!/usr/bin/env node

const SUPABASE_URL_PATH = "../~SUPABASE_URL";
const SUPABASE_KEY_PATH = "../~SUPABASE_SERVICE_ROLE_KEY";
const SUPABASE_CONCURRENCY = 1;

const PRESS_RELEASES_LIST_FILEPATH = "./press-releases.csv";
const PRESS_RELEASES_LIST_COLS = ["uuid", "url"];

const INVESTOR_UPDATES_FILEPATH = "./investor-updates.yaml";

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { createClient } from "@supabase/supabase-js";
import pLimit from "p-limit";
import { scrapePressReleases } from "./press-releases.js";
import { readInvestorUpdates } from "./investor-updates.js";

const makeSupabase = (url_file, key_file) =>
  createClient(
    fs.readFileSync(url_file, "utf8"),
    fs.readFileSync(key_file, "utf8")
  );

async function* map(fn, iterable) {
  for await (const it of iterable) {
    yield fn(it);
  }
}

(async function main() {
  const investorUpdatesGen = map((it) => {
    it.visibility = "authenticated";
    return it;
  }, readInvestorUpdates(path.join(__dirname, INVESTOR_UPDATES_FILEPATH)));

  const pressReleasesGen = map((it) => {
    it.visibility = "public";
    return it;
  }, scrapePressReleases(path.join(__dirname, PRESS_RELEASES_LIST_FILEPATH), PRESS_RELEASES_LIST_COLS));

  const supabase = makeSupabase(
    path.join(__dirname, SUPABASE_URL_PATH),
    path.join(__dirname, SUPABASE_KEY_PATH)
  );

  const limit = pLimit(SUPABASE_CONCURRENCY);
  let ok = 0;
  let bad = 0;

  async function save(item) {
    const { uuid, ...fields } = item;
    try {
      const { data, error } = await supabase
        .from("articles")
        // https://supabase.com/docs/reference/javascript/upsert
        .upsert({ id: uuid, ...fields })
        .select();
      if (error) {
        throw new Error(JSON.stringify(error));
      }
      ok += 1;
      process.stdout.write(`✓ Supabase: ${uuid}\n`);
    } catch (e) {
      bad += 1;
      process.stderr.write(`✗ Supabase: ${uuid} — ${e?.message || e}\n`);
    }
  }

  const advance = async (iterable, tasks) => {
    for await (const item of iterable) {
      tasks.push(limit(() => save(item)));
    }
  };

  const tasks = [];
  await Promise.all([
    advance(investorUpdatesGen, tasks),
    // advance(pressReleasesGen, tasks),
  ]);

  await Promise.all(tasks);

  console.log(`\nDONE: Stored to database. Success: ${ok}, Failed: ${bad}.`);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
