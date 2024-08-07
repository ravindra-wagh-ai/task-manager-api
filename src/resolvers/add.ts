import Task from "../models/task";
import { GraphQLError } from "graphql";
export default async (
  _: any,
  args: { input: Task },
  ctx: any
): Promise<any> => {
  let authorization: string | undefined = ctx?.req.headers["authorization"];
  console.log(authorization);
  if (authorization === undefined) {
    throw new GraphQLError("An error occured", {
      extensions: {
        originalError: {
          code: 400,
          message: "missing authorization token",
        },
      },
    });
  }
};
