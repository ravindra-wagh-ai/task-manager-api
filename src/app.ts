import express, { Express, NextFunction, Request, Response } from "express";
import env from "dotenv";
import requestIp from "request-ip";
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import yoga from "./yoga";
import router from "./routes/index";
const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, './app/browser');
console.log(browserDistFolder);
const app: Express = express();
env.config();
app.use(router);
app.use(async (req: Request, res: Response, next: NextFunction) => {
  let r_ip = requestIp.getClientIp(req)!;
  if (r_ip === "::1") {
    r_ip = "127.0.0.1";
  }
  //console.log("r_ip: ", r_ip);
  req.headers.xip = r_ip;
  next();
});
app.use("/taskapi", yoga);
app.use(express.static(browserDistFolder));
app.set("view engine","pug");
//app.set("views",browserDistFolder);
app.listen(process.env.PORT, async () => {
  console.log(`🚀 server started at port ${process.env.PORT}`);
});
