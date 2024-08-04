import format from "string-format";
import env from "dotenv";
import api from "./api.js";
import service_token from "./service_token.js";
import { GraphQLError } from "graphql";
env.config();

export default async (args: object): Promise<object> => {
  let row = null;
  try {
    let gql = {
      query: "mutation ($input: Insert!) { insert (input: $input) }",
      variables: { input: args },
    };
    let token = service_token.get();
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    let url = format(process.env.BASE_URL as string, process.env.DATA as string);
    let result = await api(url, gql, headers);
    if (result.data !== null && result.data.insert !== null) {
      row = result.data.insert;
    } else {
      throw new GraphQLError(result.errors[0].message);
    }

  } catch (e) {
    console.log(e);
    throw e;
  }
  return row;
};
