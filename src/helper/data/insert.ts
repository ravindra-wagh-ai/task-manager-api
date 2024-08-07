import Insert from "../../models/insert.js";
import pgql from "./pgql";
export default async (args: Insert): Promise<object> => {
  let row: object;
  try {
    let params = [];
    let columns: string[] = [];
    let values: any[] = [];
    let p = 1;
    for (let column of args.columns) {
      columns.push(column.name as string);
      params.push(`$${p}`);
      values.push(column.value);
      p++;
    }

    let query = `INSERT INTO ${args.table} (${columns.join(",")}) `;
    query += `VALUES(${params.join(",")}) RETURNING *`;
    let result = await pgql.write(query, values);
    if (result !== undefined) {
      row = result.rows.shift();
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
  return row!;
};
