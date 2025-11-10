import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getIsAdminOr403 } from "../../api-lib/auth.ts";
import { bodyParser } from "../../api-lib/email.ts";
import { createAdminClient } from "../../api-lib/supabase.ts";
import { BUCKET } from "../../src/variables.js";

// "GET"
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!getIsAdminOr403(req, res)) {
    return;
  }

  const payload = await bodyParser(req);
  let { filePath, timeout, options } = payload;
  timeout = parseInt(timeout);

  const adminClient = createAdminClient();
  const signedUrl = await adminClient.storage
    .from(BUCKET)
    .createSignedUrl(filePath, timeout, options);

  if (signedUrl.error) {
    res.status(400).json({ error: signedUrl.error.message });
    return;
  }

  res.status(200).json({ data: signedUrl.data });
}
