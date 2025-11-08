import { createConversation } from "../api-utils/helpscout/basic-example.js";

export default async function handler(req, res) {
  try {
    const data = await createConversation();
    res.status(200).json({ data });
  } catch (e) {
    res.status(200).json({ error: e.message });
  }
}
