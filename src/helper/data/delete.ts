import pgql from "./pgql";
import Delete from "../../models/delete";

export default async (args: Delete): Promise<any> => {
  let row;
  try {
    let query = `DELETE FROM ${args.table}`;
    let criteria: string[] = [];
    let values: any[] = [];
    let p = 1;
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
      `${query} WHERE ${criteria.join(",")}`;
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
