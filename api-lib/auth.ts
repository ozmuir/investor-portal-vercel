import { jwtVerify } from "jose";
import { createUserClient } from "./supabase.ts";

const { SUPABASE_JWT_SECRET } = process.env;
if (!SUPABASE_JWT_SECRET) throw new Error("SUPABASE_JWT_SECRET not set.");

const secret = new TextEncoder().encode(SUPABASE_JWT_SECRET);

export const getToken = (req) => req.headers.authorization?.split(" ")[1];

export const verify = async (accessToken) => {
  const { payload } = await jwtVerify(accessToken, secret);
  return payload.sub;
};

/*
export const verifyRequest = async (req) => {
  return verify(getToken(req));
};
*/

export const getAuthenticatedUserIdOr401 = async (req, res) => {
  const accessToken = getToken(req);
  let userId;
  try {
    return verify(accessToken); // async
  } catch (err) {
    res.status(401).json({ error: err.message });
    return false;
  }
};

export const getIsAdminOr403 = async (req, res) => {
  const userId = await getAuthenticatedUserIdOr401(req, res);
  if (!userId) {
    return false;
  }

  const accessToken = getToken(req);
  const userClient = createUserClient(accessToken);

  const profileSelect = await userClient
    .from("profiles")
    .select("is_admin")
    .eq("user_id", userId) // IMPORTANT if using *ADMIN* client here
    .limit(1)
    .single();
  if (profileSelect.error) {
    res.status(400).json({ error: profileSelect.error.message });
    return false;
  }
  if (profileSelect.data.is_admin !== true) {
    res.status(403).json({ error: "Not an admin." });
    return false;
  }
  return true;
};
