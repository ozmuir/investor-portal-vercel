import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getAuthenticatedUserIdOr401 } from "../../api-lib/auth.ts";
import { createAdminClient } from "../../api-lib/supabase.ts";

// "POST"
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const userId = await getAuthenticatedUserIdOr401(req, res);
  if (!userId) {
    return;
  }
  // This uses admin key but does not require admin access,
  // it just deletes the current userId
  const adminClient = createAdminClient();
  adminClient.auth.admin
    .deleteUser(userId)
    .then(({ data, error }) => {
      if (error) {
        res.status(400).json({ error });
      } else {
        res.status(200).json({ data: { status: "DELETED" } });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: { message: error.message } });
    });
}
