import express, { Express, NextFunction, Request, Response } from "express";
import env from "dotenv";
import requestIp from "request-ip";
import yoga from "./yoga";
const app: Express = express();
env.config();

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
app.use("/taskapi", yoga);
app.listen(process.env.PORT, async () => {
  console.log(`🚀 server started at port ${process.env.PORT}`);
});
