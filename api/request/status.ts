import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getIsAdminOr403 } from "../../api-lib/auth.ts";
import { bodyParser } from "../../api-lib/email.ts";
import { createAdminClient } from "../../api-lib/supabase.ts";

// "POST"
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!getIsAdminOr403(req, res)) {
    return;
  }
  const payload = await bodyParser(req);
  const { request_id, status } = payload;
  const adminClient = createAdminClient();
  const { error } = await adminClient
    .from("requests")
    .update({ res_status: status })
    .eq("id", request_id);
  if (error) {
    res.status(400).json({ error });
    return;
  }
  res.status(200).json({ data: payload });
}
