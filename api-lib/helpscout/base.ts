export const helpscoutEndpoint = (path) => `https://api.helpscout.net${path}`;

import util from "util";

export const inspect = (obj: {}) =>
  util.inspect(obj, { depth: null, colors: true });
