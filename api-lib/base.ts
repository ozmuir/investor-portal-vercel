import util from "util";
import { truthy } from "../src/utils/index.js";

export const curlyBraces = (it: string) => `{${it}}`;

// A real Google Workspace user to authorize as
export const SENDER_USER = "amy@orthogonalthinker.com";

// The sender domain (and preferably, the name) must be as at:
// https://supabase.com/dashboard/project/_/auth/smtp
// The sender domain must be authorized at the SMTP provider:
// https://app.mailersend.com/domains/65qngkdvxwolwr12
export const SENDER_EMAIL = "investors@orthogonalthinker.com";
export const SENDER_NAME = "Orthogonal Investor Portal";

export const makeAddress = (email: string, name: string) =>
  [name ? `"${name}"` : "", `<${email}>`].filter(truthy).join(" ");

export const sleep = (timeout: number) =>
  new Promise((res, rej) => setTimeout(res, timeout));

export const inspect = (obj: {}) =>
  util.inspect(obj, { depth: null, colors: true });

export type RequestRow = {
  id: UUID;
  short_id: string;
  profile_id: UUID | null;
  email: string;
  req_summary: string;
  req_details: string;
  res_status: string;
  res_note: string;
  helpscout_conversation_id: string | null;
  created_at: Date;
  updated_at: Date;
};
// VIEW public.view_requests_v2
export type RequestPlusRow = RequestRow & {
  investments: {
    id: UUID;
    entity_name: string;
    invt_name: string;
    invt_shares: number;
    invt_shares_dm: number;
  }[];
  files: {
    id: UUID;
    name: string;
    mimetype: string;
  }[];
};
export type RequestUpsertData = RequestRow & {
  investment_ids: UUID[];
  file_ids: UUID[];
};

export type RequestStatus = string & { readonly brand: unique symbol }; // TODO

export type UUID = string & { readonly brand: unique symbol };

export type Profile = {
  id: UUID;
  user_id: UUID;
  email: string;
  phone: string;
  name: string;
  address: string;
  address_erc20: string; // TODO
  created_at: string; // TODO
  is_admin: boolean; // TODO
};

export type RequestPayload = {
  id?: UUID;
  req_summary: string;
  req_details: string;
  invt_id_: UUID[];
  file_id_: UUID[];
};
