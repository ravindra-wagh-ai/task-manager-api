import express, { Express, NextFunction, Request, Response } from "express";
import { createYoga, createSchema, maskError } from "graphql-yoga";
import { GraphQLError } from "graphql";
import { createEnvelopQueryValidationPlugin } from "graphql-constraint-directive";
import env from "dotenv";
import requestIp from "request-ip";
import typeDefs from "./types/index";
import resolvers from "./resolvers/index";
import handler from "./handler";
const app: Express = express();
env.config();
const yoga = createYoga({
  schema: createSchema({
    typeDefs: typeDefs,
    resolvers: resolvers,
  }),
  plugins: [handler(), createEnvelopQueryValidationPlugin()],
  graphqlEndpoint: "/taskapi",
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
app.use("/taskapi", yoga);
app.listen(process.env.PORT, async () => {
  console.log(`🚀 server started at port ${process.env.PORT}`);
});
