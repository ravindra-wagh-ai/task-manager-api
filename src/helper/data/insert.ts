import Insert from "../../models/insert.js";
import pgql from "./pgql";
export default async (args: Insert): Promise<object> => {
  let row: object;
  try {
    let params = [];
    for (let i = 1; i <= args.columns.length; i++) {
      params.push(`$${i}`);
    }

    let query = `INSERT INTO ${args.table} (${args.columns?.join(",")})`;
    query += `VALUES(${params.join(",")}) RETURNING *`;
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
