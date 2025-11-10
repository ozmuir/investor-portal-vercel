import util from "util";
import { truthy } from "../src/utils/index.js";

export const makeAddress = (email: string, name: string) =>
  [name ? `"${name}"` : "", `<${email}>`].filter(truthy).join(" ");

export const sleep = (timeout: number) =>
  new Promise((res, rej) => setTimeout(res, timeout));

export const inspect = (obj: {}) =>
  util.inspect(obj, { depth: null, colors: true });
