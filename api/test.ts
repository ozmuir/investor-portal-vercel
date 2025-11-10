import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  startConversation,
  addToConversation,
} from "../api-lib/helpscout/conversation.ts";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // const conversationId = await startConversation({
    //   recipient: {
    //     email: "0zmuir@gmail.com",
    //   },
    //   subject: "Support Request [ABC]",
    //   body: "Zzzzz",
    // });
    // res.status(200).json({ data: { conversationId } });

    const threadId = await addToConversation({
      conversationId: "3135619798",
      recipient: {
        email: "0zmuir@gmail.com",
      },
      body: "test customer reply 1",
    });
    res.status(200).json({ data: { threadId } });
  } catch (e) {
    res.status(200).json({ error: e.message });
  }
}
