import Select from "../../models/select";
import pgql from "./pgql";
export default async (input: Select): Promise<any> => {
  let rows: any[] = [];
  try {
    let query = `SELECT ${input.columns?.join(",")} FROM ${input.table}`;
    if (input.criteria !== undefined) {
      query = `${query} WHERE ${input.criteria}`;
    }
    let result = await pgql.read(query);
    console.log(result);
    return rows;
  } catch (e) {
    throw e;
  }
};
