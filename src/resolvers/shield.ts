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
    include: true,
  },
  {
    name: "update",
    execute: update,
    include: true,
  },
  {
    name: "delete",
    execute: deleteTask,
    include: true,
  },
  {
    name: "tasks",
    execute: list,
    include: true,
  },
  {
    name: "signin",
    execute: signin,
    include: false,
  },
  {
    name: "signup",
    execute: signup,
    include: false,
  },
];
export default async (parent: any, args: any, ctx: any, info: any) => {
  let field: string = info.fieldName;
  let headers = ctx.req.headers;
  let resolver = resolvers.find((x) => x.name === field);
  if (resolver.include) {
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

      return await resolver.execute(parent, args, ctx, info);
    }
  } else {
    return await resolver.execute(parent, args, ctx, info);
  }
};
