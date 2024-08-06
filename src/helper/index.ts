import method from "./method";
import data from "./data/index";
import log from "./log.js";
import user from "./user";

export default {
  data: data,
  get: {
    method: method,
  },
  log: log,
  user: user,
};
