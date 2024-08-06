import pgql from "./pgql";
import Delete from "../../models/delete";

export default async (args: Delete): Promise<object> => {
  let row: object;
  try {
    let query = `DELETE FROM ${args.table}`;
    if (args.criteria !== undefined) {
      query = `${query} WHERE ${args.criteria}`;
    }
    query += " RETURNING *";
    let result = await pgql.write(query, args.values);
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
