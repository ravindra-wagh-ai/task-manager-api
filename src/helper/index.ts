import method from "./method";
import api from "./data/api";
import data from "./data/index";
import log from "./log.js";
import user from "./user";

export default {
  data: data,
  api: api,
  get: {
    method: method,
  },
  log: log,
  user: user,
};
