import axios from "axios";
import fs from "node:fs/promises";
import { open as fsOpen, close as fsClose } from "node:fs";
import path from "node:path";
import { setTimeout as wait } from "node:timers/promises";
import { helpscoutEndpoint, inspect } from "./base.js";

const { HELPSCOUT_ACCESS_KEY } = process.env;
if (!HELPSCOUT_ACCESS_KEY) throw new Error("HELPSCOUT_ACCESS_KEY not set.");

const { HELPSCOUT_SECRET_KEY } = process.env;
if (!HELPSCOUT_SECRET_KEY) throw new Error("HELPSCOUT_SECRET_KEY not set.");

const TOKEN_FILE = "/tmp/helpscout.json";
const LOCK_FILE = TOKEN_FILE + ".lock";

type AccessToken = string & { readonly brand: unique symbol };
type TokenObject = { access_token: AccessToken };
let memToken: TokenObject | null = null;
let refreshP: Promise<TokenObject> | null = null;

const readToken = async () => {
  try {
    return JSON.parse(await fs.readFile(TOKEN_FILE, "utf8")) as TokenObject;
  } catch {}
  return null;
};

const writeToken = async (obj: TokenObject) => {
  const dir = path.dirname(TOKEN_FILE);
  const tmp = path.join(
    dir,
    `.tmp.${path.basename(TOKEN_FILE)}.${process.pid}`
  );
  await fs.writeFile(tmp, JSON.stringify(obj), { mode: 0o600 });
  await fs.rename(tmp, TOKEN_FILE);
};

const lock = async (timeoutMs = 5000, pollMs = 50) => {
  const start = Date.now();
  while (true) {
    try {
      const fd = await new Promise<number>((res, rej) =>
        fsOpen(LOCK_FILE, "wx", 0o600, (e, fd) => (e ? rej(e) : res(fd)))
      );
      await fs.writeFile(LOCK_FILE, String(process.pid));
      return async () => {
        try {
          await fs.unlink(LOCK_FILE);
        } catch {}
        try {
          fsClose(fd);
        } catch {}
      };
    } catch {
      if (Date.now() - start > timeoutMs) throw new Error("token lock timeout");
      await wait(pollMs);
    }
  }
};

async function ensureToken(getNewToken: typeof requestNewToken) {
  if (memToken) return memToken;

  const disk = await readToken();
  if (disk) return (memToken = disk);

  return await refreshNow(getNewToken);
}

async function refreshNow(getNewToken: typeof requestNewToken) {
  if (!refreshP) {
    refreshP = (async () => {
      let release;
      try {
        release = await lock().catch(async () => {
          await wait(150);
        });
        const again = await readToken();
        if (again?.access_token) {
          memToken = again;
          return memToken;
        }

        const fresh = await getNewToken();
        if (!fresh?.access_token)
          throw new Error("requestNewToken: missing access_token");
        const obj = { access_token: fresh.access_token };
        await writeToken(obj);
        memToken = obj;
        return memToken;
      } finally {
        if (release) await release();
      }
    })().finally(() => {
      refreshP = null;
    });
  }
  return await refreshP;
}

export function createHelpScoutAuth(getNewToken: typeof requestNewToken) {
  return async function withHelpScoutAuth(
    fn: (access_token: AccessToken) => unknown
  ) {
    let { access_token } = await ensureToken(getNewToken);
    try {
      return await fn(access_token);
    } catch (err) {
      if (err?.status === 401) {
        ({ access_token } = await refreshNow(getNewToken));
        return await fn(access_token);
      }
      console.error(err.message);
      console.error(err.response.status, err.response.statusText);
      console.error(inspect(err.response.data));
      throw err;
    }
  };
}

export async function requestNewToken() {
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
  return res.data as TokenObject;
}
