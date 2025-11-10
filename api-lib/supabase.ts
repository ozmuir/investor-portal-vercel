import { createClient } from "@supabase/supabase-js";

const { SUPABASE_URL } = process.env;
if (!SUPABASE_URL) throw new Error("SUPABASE_URL not set.");

const { SUPABASE_ANON_KEY } = process.env;
if (!SUPABASE_ANON_KEY) throw new Error("SUPABASE_ANON_KEY not set.");

const { SUPABASE_SERVICE_ROLE_KEY } = process.env;
if (!SUPABASE_SERVICE_ROLE_KEY)
  throw new Error("SUPABASE_SERVICE_ROLE_KEY not set.");

export const createUserClient = (accessToken) =>
  createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: { headers: { Authorization: `Bearer ${accessToken}` } },
  });

export const createAdminClient = () =>
  createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
