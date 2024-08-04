import env from "dotenv";
import format from "string-format";
import service_token from "./service_token";
import api from "./api.js";
env.config();

export default async (args: any): Promise<object> => {
  let row: object;
  try {
    let gql = {
      query: "mutation ($input: Update!) { update (input: $input) }",
      variables: { input: args },
    };
    let token = service_token.get();
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    let url = format(process.env.BASE_URL as string, process.env.DATA as string);
    let result = await api(url, gql, headers);
    if (result.data !== null && result.data.update !== null) {
      row = result.data.update;
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
  return row!;
};
