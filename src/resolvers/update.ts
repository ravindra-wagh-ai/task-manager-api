import Task from "../models/task";
import helper from "../helper/index";
import { GraphQLError } from "graphql";
export default async (_: any, args: { input: Task }): Promise<any> => {
  let state: any;
  let row:any;
  try {
    state = await helper.task.update(args.input);
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
  return row;
};
