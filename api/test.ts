import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createConversation } from "../api-lib/helpscout/conversation.ts";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const data = await createConversation({});
    res.status(200).json({ data });
  } catch (e) {
    res.status(200).json({ error: e.message });
  }
}
