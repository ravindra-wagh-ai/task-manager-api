import format from "string-format";
import env from "dotenv";
import api from "./api";
import service_token from "./service_token";
env.config();
export default async (input: object): Promise<number> => {
  let rows = 0;
  let gql = {
    query: "query($input: Count) { count (input: $input) }",
    variables: { input: input },
  };
  let token = service_token.get();
  let headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  let url = format(process.env.BASE_URL as string, process.env.DATA as string);
  let result = await api(url, gql, headers);

  if (result.data.count !== null) {
    rows = result.data.count;
  }
  return rows;
};
