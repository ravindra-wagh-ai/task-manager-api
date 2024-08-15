import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";

export default async (_: any, args: any, ctx: any): Promise<any> => {
  let verified = false;
  try {
    let payload = jwt.verify(args.token, "TESTING");
    verified = payload !== undefined;
  } catch (e: any) {
    throw new GraphQLError("Unable to verify token", {
      extensions: {
        originalError: {
          code: 500,
          message: e.message,
        },
      },
    });
  }
  return verified;
};
