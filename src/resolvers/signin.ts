import { GraphQLError } from "graphql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import helper from "../helper/index";
import validate from "../validate/index";
import SignIn from "../models/signin";
import dotenv from "dotenv";
dotenv.config();
export default async (_: any, args: { input: SignIn }, ctx: any, info: any): Promise<any> => {

  let valid = await validate.signin(args.input);
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


  let row = await helper.user.getByEmail(args.input.email);
  if (row !== undefined) {
    let compared = await bcrypt.compare(args.input.password!, row.password);
    if (compared) {
      delete row["password"];
      let token = jwt.sign(row, "TESTING", {
        expiresIn: "2h",
      });
      return { token: token };
    } else {
      throw new GraphQLError("An error occured", {
        extensions: {
          originalError: {
            code: 204,
            message: "password does not match",
          },
        },
      });
    }
  } else {
    throw new GraphQLError("An error occured", {
      extensions: {
        originalError: {
          code: 204,
          message: "user does not exist",
        },
      },
    });
  }

};
