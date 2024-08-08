import signup from "./signup";
import signin from "./signin";
import add from "./add";
import update from "./update";
import deleteTask from "./delete";
import list from "./list";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
const resolvers: any[] = [
  {
    name: "add",
    execute: add,
  },
  {
    name: "update",
    execute: update,
  },
  {
    name: "delete",
    execute: deleteTask,
  },
  {
    name: "tasks",
    execute: list,
  },
  {
    name: "signin",
    execute: signin,
  },
  {
    name: "signup",
    execute: signup,
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
    let resolver = resolvers.find((x) => x.name === field);
    return await resolver.execute(parent, args, ctx, info);
  }
};
