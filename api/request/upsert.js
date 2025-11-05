// import { pick } from "rambda";
import { getAuthenticatedUserIdOr401, getToken } from "../../api/utils.js";
import { bodyParser, sendEmail_forRequest } from "../../api/utils.js";
import {
  createUserClient,
  emailHeaders,
  getThreadInfo,
} from "../../api/utils.js";

// const picker = pick(["req_summary", "req_details", "invt_id_", "file_id_"]);

// "POST"
export default async function handler(req, res) {
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
  const { raw, headers } = await sendEmail_forRequest(
    { ...payload, profile, req_id, req_short_id },
    threadInfo
  );

  const newMessage = { request_id: req_id, message: raw };
  for (let col in emailHeaders) newMessage[col] = headers[emailHeaders[col]];

  const { error: messagesError } = await userClient
    .from("messages")
    .insert(newMessage);
  if (messagesError) {
    console.error("Error inserting a message:", messagesError);
  }

  res.status(200).json({ data: { req_id } });
}
