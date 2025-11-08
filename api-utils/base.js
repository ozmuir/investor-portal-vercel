import { truthy } from "../src/utils/index.js";

export const makeAddress = (email, name) =>
  [name ? `"${name}"` : "", `<${email}>`].filter(truthy).join(" ");
