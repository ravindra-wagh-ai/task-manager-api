import Update from "../../models/update";
import pgql from "./pgql";
export default async (input: Update): Promise<object> => {
  let row: object;
  try {
    let query = `UPDATE  ${input.table} SET ${input.columns?.join(",")}`;
    if (input.criteria !== undefined) {
      query = `${query} WHERE ${input.criteria}`;
    }
    query += " RETURNING *";
    let result = await pgql.write(query, input.values);
    console.log(result);
    if (result !== undefined) {
      row = result.rows.shift();
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
  return row!;
};
