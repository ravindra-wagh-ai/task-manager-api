import Task from "../models/task";
import helper from "../helper/index";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";

export default async (_: any, args: { input: Task }, ctx: any): Promise<any> => {
  let state: any;
  let row:any;
  let authorization = ctx.req.headers["authorization"];
  let user:any;
  try {
    if(authorization!== undefined){
      let token = authorization.replace("Bearer","").trim();
      user = jwt.decode(token);
      args.input.userid = user.id
    }
    
    state = await helper.task.add(args.input);
    row = await helper.task.get(state?.id);
  } catch (e: any) {
    throw new GraphQLError("Unable to create task", {
      extensions: {
        originalError: {
          code: 500,
          message: e.message,
        },
      },
    });
  }
  ctx.pubSub.publish("show", row);
  return row;
};
