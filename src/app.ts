import express, { Express, NextFunction, Request, Response } from "express";
import { createYoga, createSchema, Plugin, maskError } from "graphql-yoga";
import { GraphQLError } from "graphql";
import { createEnvelopQueryValidationPlugin } from "graphql-constraint-directive";
import env from "dotenv";
import requestIp from "request-ip";
import DeviceDetector from "device-detector-js";
import typeDefs from "./types/index";
import resolvers from "./resolvers/index";
import helper from "./helper/index";
const app: Express = express();
env.config();

function handler(): Plugin {
  return {
    async onRequest({ request, serverContext, fetchAPI, endResponse }) {
      let body = request.body as any;
      let readableState = body._readableState;
      let data = Buffer.from(readableState?.buffer[0]).toString();
      let query = JSON.parse(data);

      let headers = request.headers;
      let url: string = request.url;
      let referer: string = headers.get("referer") as string;
      let x_ip: string = headers.get("xip") as string;
      let ip: string = x_ip; // || x_real_ip;
      //console.log(request.headers);
      const deviceDetector = new DeviceDetector();
      const userAgent = request.headers.get("user-agent");
      const device = deviceDetector.parse(userAgent!);

      //console.log(device);
      if (ip !== undefined && ip !== null) {
        request.headers.set("x-ip", ip);
      }
      
      if (!query?.query.includes("IntrospectionQuery")) {
        let method = helper.get.method(query?.query);
        let logger = {
          url: url,
          referer: referer,
          browser: device.client?.name,
          device: device.device?.type,
          brand: device.device?.brand,
          source: "API",
          method: method,
          originator_type: null,
          originator: null,
          starttime: new Date().toISOString(),
          ip: ip,
          //"request": Buffer.from(JSON.stringify(query)).toString("base64"),
        };
        let logId = await helper.log.add(logger);
        request.headers.set("x-method", method);
        request.headers.set("logid", logId);
      }
    },
    async onResponse({ request, serverContext, response }) {
      let method = request.headers.get("x-method");
      //console.log("method: ", method);
      let status = "NONE";
      let body = (response as any)?.bodyInit;
      //console.log(body);
      if (body !== undefined && body !== "" && !body.includes("html")) {
        body = JSON.parse(body);
        if (body.data !== undefined) {
          if (method !== undefined) {
            let data = body.data[method!];
            if (data !== null) {
              status = "SUCCEED";
            } else {
              status = "FAILED";
            }
          }
        }
      }

      let logId = request.headers.get("logid");
      console.log("logid:", logId);
      if (logId !== null) {
        let logger = {
          endtime: new Date(),
          //response: Buffer.from(JSON.stringify(body.data)).toString("base64"),
          status: status,
        };
        await helper.log.update(logId!, logger);
      }
    },
  };
}
const yoga = createYoga({
  schema: createSchema({
    typeDefs: typeDefs,
    resolvers: resolvers,
  }),
  plugins: [handler(), createEnvelopQueryValidationPlugin()],
  graphqlEndpoint: "/identity",
  maskedErrors: {
    maskError(e) {
      let gqle = e as GraphQLError;
      return maskError(gqle.extensions.originalError, gqle.message, true);
    },
  },
});
app.get("/", async (req: Request, res: Response) => {
  res.json({ status: "it work's" });
});
app.use(async (req: Request, res: Response, next: NextFunction) => {
  let r_ip = requestIp.getClientIp(req)!;
  if (r_ip === "::1") {
    r_ip = "127.0.0.1";
  }
  //console.log("r_ip: ", r_ip);
  req.headers.xip = r_ip;
  next();
});
app.use("/identity", yoga);
app.listen(process.env.PORT, async () => {
  console.log(`🚀 server started at port ${process.env.PORT}`);
});
