import env from "dotenv";
import format from "string-format";
import service_token from "./service_token";
import api from "./api";

env.config();

export default async (args: any): Promise<object> => {
  let rowId = null;
  try {
    let { table, criteria } = args;
    let input = {
      table: table,
      criteria: criteria,
    };

    let gql = {
      query: "query($input: Delete) { delete (input: $input) }",
      variables: { input: input },
    };
    let token = service_token.get();
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    let url = format(process.env.BASE_URL as string, process.env.DATA as string);
    let result = await api(url, gql, headers);

    if (result.data.delete !== null) {
      rowId = result.data.delete;
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
  return rowId;
};
