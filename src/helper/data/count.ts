import pgql from "./pgql";
export default async (
  table: string,
  criteria?: string,
  values?: []
): Promise<number> => {
  let rows = 0;
  let query = `SELECT COUNT(1) count FROM ${table}`;
  if (criteria !== undefined) {
    query = `${query} ${criteria}`;
  }
  let result = await pgql.read(query, values);
  console.log(result);
  if (result !== undefined) {
    rows = result.rows.shift().count;
  }
  return rows;
};
