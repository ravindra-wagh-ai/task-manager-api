import format from "string-format";
import api from "./api.js";
import service_token from "./service_token.js";
export default async (table: string): Promise<any[]> => {
  let list: object[] = [];
  try {
    let gql = {
      query: "query ($table: String!) { columns (table: $table) {  name type } }",
      variables: { table: table },
    };
    let token = service_token.get();
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    let url = format(process.env.BASE_URL as string, process.env.DATA as string);
    let result = await api(url, gql, headers);
    let rows = [];
    if (result.data.columns !== null) {
      rows = result.data.columns;
    }
    return rows;
  } catch (e) {
    throw e;
  }
  return list;
};
