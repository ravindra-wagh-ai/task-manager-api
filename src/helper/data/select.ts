import Select from "../../models/select";
import pgql from "./pgql";
export default async (args: Select): Promise<any> => {
  let rows: any[] = [];
  try {
    let query = `SELECT ${args.columns?.map((x) => x.name).join(",")} `;
    query += `FROM ${args.table}`;
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
    let result = await pgql.read(query);
    console.log(result);
    if (result !== undefined) {
      rows = result.rows;
    }
    return rows;
  } catch (e) {
    throw e;
  }
};
