import Count from "../../models/count";
import pgql from "./pgql";
export default async (args: Count): Promise<number> => {
  let rows = 0;
  let query = `SELECT COUNT(1) count FROM ${args.table}`;
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
  }
  let result = await pgql.read(query, values);
  console.log(result);
  if (result !== undefined) {
    rows = result.rows.shift().count;
  }
  return rows;
};
