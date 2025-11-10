import type { VercelRequest, VercelResponse } from "@vercel/node";
// import { pick } from "rambda";
import { getAuthenticatedUserIdOr401, getToken } from "../../api-lib/auth.ts";
import {
  bodyParser,
  sendEmail_forRequest,
  getThreadInfo,
  insertMessage,
} from "../../api-lib/email.ts";
import { createUserClient } from "../../api-lib/supabase.ts";

// const picker = pick(["req_summary", "req_details", "invt_id_", "file_id_"]);

// "POST"
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const user_id = await getAuthenticatedUserIdOr401(req, res);
  if (!user_id) {
    return;
  }

  const accessToken = getToken(req);
  const userClient = createUserClient(accessToken);

  // Read profile
  const profileSelect = await userClient
    .from("profiles")
    .select("*")
    .eq("user_id", user_id)
    .limit(1)
    .single();
  if (profileSelect.error) {
    res.status(400).json({ error: profileSelect.error.message });
    return;
  }
  const profile = profileSelect.data;

  const payload = await bodyParser(req);

  const rpc_args = {
    // renaming args for easier handling in the RPC function
    req_id: payload.id || null, // must not be undefined because the RPC function expects it
    _req_summary: payload.req_summary,
    _req_details: payload.req_details,
    invt_id_: payload.invt_id_,
    file_id_: payload.file_id_,
  };
  const {
    // data: req_id, //
    data: {
      id: req_id,
      short_id: req_short_id,
      //
    },
    error,
    //
  } = await userClient.rpc("rpc_request_upsert", rpc_args);
  if (error) {
    res.status(400).json({ error });
    return;
  }

  const threadInfo = await getThreadInfo(req_id, userClient);

  // SEND MAIL
  const { rawEmail, headers } = await sendEmail_forRequest(
    { ...payload, profile, req_id, req_short_id },
    threadInfo
  );

  const { error: messagesError } = await insertMessage(
    req_id,
    headers,
    rawEmail,
    userClient
  );
  if (messagesError) {
    console.error("Error inserting message:", messagesError);
    res.status(400).json({
      error: `Error inserting message: ${messagesError.message}`,
    });
    return;
  }

  res.status(200).json({ data: { req_id } });
}
