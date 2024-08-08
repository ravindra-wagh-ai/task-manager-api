import signup from "./signup";
import signin from "./signin";
import add from "./add";
import update from "./update";
import deleteTask from "./delete";
import list from "./list";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
const stacklist: any[] = [
  {
    name: "add",
    call: add,
  },
  {
    name: "update",
    call: update,
  },
  {
    name: "delete",
    call: deleteTask,
  },
  {
    name: "tasks",
    call: list,
  },
  {
    name: "signin",
    call: signin,
  },
  {
    name: "signup",
    call: signup,
  },
];
export default async (parent: any, args: any, ctx: any, info: any) => {
  let field: string = info.fieldName;
  let headers = ctx.req.headers;
  let authorization = headers["authorization"];
  if (authorization === undefined) {
    throw new GraphQLError("An error occured", {
      extensions: {
        originalError: {
          code: 400,
          message: "missing authorization token",
        },
      },
    });
  } else {
    let token = authorization.replace("Bearer", "").trim();
    //let verified!: string;
    try {
      jwt.verify(token, "TESTING") as string;
     
    } catch (e) {
      throw new GraphQLError("An error occured", {
        extensions: {
          originalError: {
            code: 401,
            message: "Token invalid/expired",
          },
        },
      });
    }
    let active = stacklist.find((x) => x.name === field);
    return await active.call(parent, args, ctx, info);
  }
};
