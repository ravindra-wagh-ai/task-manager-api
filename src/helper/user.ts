import { COP } from "../models/cop";
import Select from "../models/select";
import data from "./data/index";
export default {
  getByEmail: async (email?: string): Promise<any> => {
    let row: Object;
    try {
      let columns = await data.columns("users");
      let input: Select = {
        table: "users",
        columns: columns.map((x) => {
          return { name: x.name };
        }),
        criteria: [
          {
            column: "email",
            cop: COP.eq,
            value: email,
          },
        ],
      };
      let rows = await data.select(input);
      row = rows.shift();
    } catch (e) {}
    return row!;
  },
};
