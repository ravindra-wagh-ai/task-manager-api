import DeviceDetector from "device-detector-js";
import jwt from "jsonwebtoken";
import helper from "../helper/index";

export default {
  add: async (ctx: any, method: string): Promise<string> => {
    let id: string = "";
    let originator_type = null;
    let originator = null;
    let headers = ctx.req.headers;
    let url = headers["origin"];
    url += ctx.req.baseUrl;
    let referer = headers["referer"];
    let x_ip: string = headers["xip"];
    let ip: string = x_ip;

    const deviceDetector = new DeviceDetector();
    const userAgent = headers["user-agent"];
    const device = deviceDetector.parse(userAgent!);

    let authorization = headers["authorization"];
    if (authorization !== undefined) {
      let token: string = authorization.replace("Bearer", "").trim();
      let user: any = jwt.decode(token);
      originator_type = user?.type;
      originator = user?.id;
    }

    let logger = {
      url: url,
      referer: decodeURI(referer),
      browser: device.client?.name,
      device: device.device?.type,
      brand: device.device?.brand,
      source: "API",
      method: method,
      originator_type: originator_type,
      originator: originator,
      starttime: new Date().toISOString(),
      ip: ip,
      //"request": Buffer.from(JSON.stringify(query)).toString("base64"),
    };
    id = await helper.log.add(logger);

    return id;
  },
  update: async (id: string, status: string): Promise<string> => {
    console.log("id:", id);
    console.log("status:", status);

    let logger = {
      endtime: new Date(),
      //response: Buffer.from(JSON.stringify(body.data)).toString("base64"),
      status: status,
    };
    return await helper.log.update(id, logger);
  },
};
