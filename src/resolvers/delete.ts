import helper from "../helper/index";
import validate from "../validate/index";
import { GraphQLError } from "graphql";
export default async (_: any, args: { id: number }): Promise<any> => {
  let valid = await validate.delete(args.id);
  if (!valid.success) {
    throw new GraphQLError("An error occured", {
      extensions: {
        originalError: {
          code: valid.code,
          message: valid.message,
        },
      },
    });
  }
  return await helper.task.delete(args.id);
};
