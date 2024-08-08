import { Plugin } from "graphql-yoga";
import DeviceDetector from "device-detector-js";
import helper from "./helper/index";
import jwt from "jsonwebtoken";
export default function(): Plugin  {
    return {
      async onRequest({ request, serverContext, fetchAPI, endResponse }) {
        let body = request.body as any;
        let readableState = body._readableState;
        let data = Buffer.from(readableState?.buffer[0]).toString();
        let query = JSON.parse(data);
        let originator_type = null;
        let originator = null;
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
          let authorization = headers.get("authorization") as string;
          if(authorization !== undefined){
            let token:string = authorization.replace("Bearer","").trim();
            let user:any = jwt.decode(token);
            originator_type =user?.type;
            originator = user?.id;
          }
          let method = helper.get.method(query?.query);
          let logger = {
            url: url,
            referer: referer,
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
        //console.log("logid:", logId);
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