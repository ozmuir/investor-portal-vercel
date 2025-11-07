import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getIsAdminOr403 } from "../../api/utils.js";
import { bodyParser, sendEmail_forResponse } from "../../api/utils.js";
import {
  createAdminClient,
  emailHeaders,
  getThreadInfo,
} from "../../api/utils.js";

// "POST"
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!getIsAdminOr403(req, res)) {
    return;
  }

  const payload = await bodyParser(req);
  const { req_id, res_note } = payload;

  const adminClient = createAdminClient();

  const resultRequestSelect = await adminClient
    .from("requests")
    .select(
      [
        "short_id",
        "profile_id",
        "res_status",
        //
      ].join(",")
    )
    .eq("id", req_id)
    .limit(1)
    .single();
  if (resultRequestSelect.error) {
    res.status(400).json({
      error: `Error selecting request: ${resultRequestSelect.error.message}`,
    });
    return;
  }
  const {
    short_id: req_short_id,
    profile_id,
    res_status,
  } = resultRequestSelect.data;

  const resultProfileSelect = await adminClient
    .from("profiles")
    .select("*")
    .eq("id", profile_id)
    .limit(1)
    .single();
  if (resultProfileSelect.error) {
    res.status(400).json({
      error: `Error selecting profile: ${resultProfileSelect.error.message}`,
    });
    return;
  }
  const profile = resultProfileSelect.data;

  // Update request
  const resultRequestUpdate = await adminClient
    .from("requests")
    .update({ res_note })
    .eq("id", req_id);
  if (resultRequestUpdate.error) {
    res.status(400).json({
      error: `Error updating request: ${resultRequestUpdate.error.message}`,
    });
    return;
  }

  // SEND MAIL
  const threadInfo = await getThreadInfo(req_id, adminClient);
  const { raw, headers } = await sendEmail_forResponse(
    { profile, req_id, req_short_id, res_status, res_note },
    threadInfo
  );

  const newMessage = { request_id: req_id, message: raw };
  for (let col in emailHeaders) newMessage[col] = headers[emailHeaders[col]];

  // Insert message
  const resultMessageInsert = await adminClient
    .from("messages")
    .insert(newMessage);
  if (resultMessageInsert.error) {
    res.status(400).json({
      error: `Error inserting message: ${resultMessageInsert.error.message}`,
    });
    return;
  }

  res.status(200).json({ data: { req_id } });
}
