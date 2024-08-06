import Update from "../../models/update";
import pgql from "./pgql";
export default async (args: Update): Promise<object> => {
  let row: object;
  try {
    let query = `UPDATE  ${args.table} SET `;
    let columns: any[] = [];
    let criteria: string[] = [];
    let values: any[] = [];
    let p = 1;
    args.columns?.forEach((c) => {
      columns.push(`${c.name} = $${p}`);
      values.push(c.value);
      p++;
    });
    query += `${columns.join(",")}`;

    if (args.criteria !== undefined) {
      args.criteria.forEach((c) => {
        if (c.lop === undefined) {
          criteria.push(`${c.column} ${c.cop} $${p}`);
        } else {
          criteria.push(`${c.column} ${c.cop} $${p} ${c.lop}`);
        }
        values.push(c.value);
        p++;
      });
      query += `WHERE ${criteria.join(",")}`;
    }
    query += " RETURNING *";
    let result = await pgql.write(query, values);
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
