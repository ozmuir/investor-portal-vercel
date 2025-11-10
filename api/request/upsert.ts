import type { VercelRequest, VercelResponse } from "@vercel/node";
// import { pick } from "rambda";
import { getAuthenticatedUserIdOr401, getToken } from "../../api-lib/auth.ts";
import {
  bodyParser,
  makeSubject,
  sendEmail_forRequest,
  // getThreadInfo,
  // insertMessage,
} from "../../api-lib/email.ts";
import { createUserClient } from "../../api-lib/supabase.ts";
import {
  addToConversation,
  startConversation,
} from "../../api-lib/helpscout/conversation.ts";
import type {
  Profile,
  RequestPayload,
  RequestUpsertData,
} from "../../api-lib/base.ts";
import { tTextRequest } from "../../api-lib/templates.ts";
import { PostgrestError } from "@supabase/supabase-js";

// const picker = pick(["req_summary", "req_details", "invt_id_", "file_id_"]);

// "POST"
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const user_id = await getAuthenticatedUserIdOr401(req, res);
  if (!user_id) {
    return;
  }

  const errors: string[] = [];

  const accessToken = getToken(req);
  const userClient = createUserClient(accessToken);

  const { data: profileData, error: profileError } = (await userClient
    .from("profiles")
    .select("*")
    .eq("user_id", user_id)
    .limit(1)
    .single()) as {
    data: Profile;
    error: PostgrestError | null;
  };

  if (profileError) {
    res.status(400).json({
      error: `Error selecting profile user_id=${user_id}: ${profileError.message}`,
    });
    return;
  }

  const payload = (await bodyParser(req)) as RequestPayload;
  const isNewRequest = !payload.id;

  const {
    data: upsertData,
    error: upsertError,
    //
  } = (await userClient.rpc("rpc_request_upsert", {
    // renaming args for easier handling in the RPC function
    req_id: payload.id || null, // must not be undefined because the RPC function expects it
    _req_summary: payload.req_summary,
    _req_details: payload.req_details,
    invt_id_: payload.invt_id_,
    file_id_: payload.file_id_,
  })) as { data: RequestUpsertData; error: PostgrestError | null };

  if (upsertError) {
    res
      .status(400)
      .json({ error: `Error upserting request: ${upsertError.message}` });
    return;
  }

  const {
    id: req_id,
    short_id: req_short_id,
    helpscout_conversation_id: conversationId,
    //
  } = upsertData;

  const recipient = {
    email: profileData.email,
  };

  if (isNewRequest) {
    const conversationId = await startConversation({
      recipient,
      subject: makeSubject(req_short_id),
      body: tTextRequest({
        req_id,
        req_short_id,
        ...payload,
      }),
      // TODO Attach files
    });

    const { error } = await userClient
      .from("requests")
      .update({ helpscout_conversation_id: conversationId })
      .eq("id", req_id);

    if (error) {
      errors.push(
        `Error adding Help Scout Conversation ID to the request: ${error.message}`
      );
      // res.status(400).json({
      //   error: `Error adding Help Scout Conversation ID to the request: ${error.message}`,
      // });
      // return;
    }
  } else {
    if (conversationId) {
      const threadId = await addToConversation({
        conversationId,
        recipient,
        body: tTextRequest({
          req_id,
          req_short_id,
          ...payload,
        }),
        // TODO Attach files
      });
    }
  }

  res.status(200).json({
    data: { req_id },
    ...(errors.length ? { error: errors.join("\n") } : {}),
    //
  });
  return;

  // const threadInfo = await getThreadInfo(req_id, userClient);

  // SEND MAIL
  const { rawEmail, headers } = await sendEmail_forRequest(
    { ...payload, profile, req_id, req_short_id }
    // threadInfo
  );

  // const { error: messagesError } = await insertMessage(
  //   req_id,
  //   headers,
  //   rawEmail,
  //   userClient
  // );
  // if (messagesError) {
  //   console.error("Error inserting message:", messagesError);
  //   res.status(400).json({
  //     error: `Error inserting message: ${messagesError.message}`,
  //   });
  //   return;
  // }

  res.status(200).json({ data: { req_id } });
}
