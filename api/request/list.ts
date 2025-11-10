import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getIsAdminOr403 } from "../../api-lib/auth.ts";
import { bodyParser } from "../../api-lib/email.ts";
import { createAdminClient } from "../../api-lib/supabase.ts";

// "GET"
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!getIsAdminOr403(req, res)) {
    return;
  }

  const adminClient = createAdminClient();

  const payload = await bodyParser(req);
  let { page, perPage } = payload;
  page = parseInt(page);
  perPage = parseInt(perPage);

  const offset = (page - 1) * perPage;
  const limit = perPage;
  const rangeFrom = offset;
  const rangeTo = offset + limit - 1;

  const requests = await adminClient
    .from("view_requests_v2")
    .select("*", { count: "estimated", head: false }) // head: true returns ONLY count
    .order("created_at", { ascending: false })
    .range(rangeFrom, rangeTo);
  if (requests.error) {
    res.status(400).json({ error: requests.error.message });
    return;
  }

  res.status(200).json({
    data: {
      items: requests.data,
      total: requests.count,
    },
  });
}
