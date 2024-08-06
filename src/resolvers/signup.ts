import { GraphQLError } from "graphql";
import helper from "../helper/index";
import validate from "../validate/index";
import bcrypt from "bcrypt";
import SignUp from "../models/signup";
import dotenv from "dotenv";
dotenv.config();
export default async (
  _: any,
  args: { input: SignUp },
  ctx: any,
  info: any
): Promise<any> => {
  try {
    let valid = await validate.signup(args.input);
    //console.log("valid: ", valid);
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
    let pwd: any = args.input.password;
    let salt: number = Number(process.env.SALT);
    args.input.password = bcrypt.hashSync(pwd, salt);
    let input = {
      table: "users",
      columns: [
        {
          name: "first_name",
          value: args.input.first_name,
        },
        {
          name: "last_name",
          value: args.input.last_name,
        },
        {
          name: "type",
          value: "USER",
        },
        {
          name: "email",
          value: args.input.email,
        },
        {
          name: "password",
          value: args.input.password,
        },
      ],
      values: Object.values(args.input),
    };
    let row = await helper.data.insert(input);
    if (row !== undefined) {
      return row;
    } else {
      throw new GraphQLError("An error occured", {
        extensions: {
          originalError: {
            code: 1234,
            message: "unable to create your account",
          },
        },
      });
    }
  } catch (e) {
    if (e instanceof GraphQLError) {
      console.log(e);
      throw new GraphQLError("unable to create your account", {
        extensions: {
          originalError: {
            code: 1007,
            message: e.message,
          },
        },
      });
    } else if (e instanceof Error) {
      throw new GraphQLError("unable to create your account", {
        extensions: {
          originalError: {
            code: 1007,
            message: e.message,
          },
        },
      });
    }
  }
};
