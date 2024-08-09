import helper from "../helper/index";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
import Criteria from "../models/criteria";
import { COP } from "../models/cop";
export default async (_: any, args: any, ctx: any): Promise<any> => {
  let list: any[]=[];
  let authorization = ctx.req.headers["authorization"];
  let user: any = null;
  let criteria: Criteria[] = [];
  try {
    if (authorization !== undefined) {
      let token = authorization.replace("Bearer", "").trim();
      user = jwt.decode(token);
    }
    criteria.push({
      column: "originator",
      cop: COP.eq,
      value: user.id,
    });
    list = await helper.log.list(criteria);
  } catch (e: any) {
    throw new GraphQLError("Unable to retrieve logs", {
      extensions: {
        originalError: {
          code: 500,
          message: e.message,
        },
      },
    });
  }
  return list;
};
