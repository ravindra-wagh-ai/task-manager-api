import format from "string-format";
import env from "dotenv";
import api from "./api.js";
import service_token from "./service_token.js";
env.config();
export default async (input: any): Promise<any> => {
  try {
    let gql = {
      query: "query($input: Select!) { select (input: $input) { rows count } }",
      variables: { input: input },
    };
    let token = service_token.get();
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    let url = format(process.env.BASE_URL as string, process.env.DATA as string);
    let result = await api(url, gql, headers);
    let rows = [];
    if (result.data.select !== null) {
      rows = result.data.select.rows;
    }
    return rows;
  } catch (e) {
    throw e;
  }
};
