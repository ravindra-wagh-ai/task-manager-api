import { uid } from "uid";
import data from "./data/index";
import Insert from "../models/insert";
import Column from "../models/column";
import Update from "../models/update";
import { COP } from "../models/cop";
export default {
  add: async (row: any): Promise<string> => {
    let id: string;
    let newId = uid(8);
    let table = "auditlogs";
    try {
      let keys = Object.keys(row);
      let columns = keys.map((k) => {
        return { name: k, value: row[k] };
      });
      columns.push({ name: "id", value: newId });
      let args: Insert = {
        table: table,
        columns: columns,
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
      let columns = Object.keys(row);
      let args: Update = {
        table: table,
        columns: columns.map((k) => {
          return { name: k, value: row[k] } as Column;
        }),
        criteria: [
          {
            column: "id",
            cop: COP.eq,
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
