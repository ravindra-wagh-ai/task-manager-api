import { uid } from "uid";
import data from "./data/index";
import Insert from "../models/insert";
export default {
  add: async (row: any): Promise<string> => {
    let id: string;
    let newId = uid(8);
    let table = "auditlogs";
    try {
      let columns = Object.keys(row);
      columns.push("id");
      let values = Object.values(row);
      values.push(newId);
      let args: Insert = {
        table: table,
        columns: columns as [string],
        values: values as [any],
      };

      let result = (await data.insert(args)) as any;
      if (result !== null) {
        id = result?.id;
      }
    } catch (e) {
      console.log(e);
    }
    return id!;
  },
  update: async (rowId: string, row: any): Promise<string> => {
    let id: string;
    let table = "auditlogs";
    try {
      let args = {
        table: table,
        columns: Object.keys(row),
        values: Object.values(row),
        criteria: [
          {
            column: "id",
            cop: "eq",
            value: rowId,
          },
        ],
      };
      let result: any = await data.update(args);
      if (result !== undefined) {
        id = result?.id;
      }
    } catch (e) {
      console.log(e);
    }
    return id!;
  },
};
