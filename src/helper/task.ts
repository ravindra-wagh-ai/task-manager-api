import { COP } from "../models/cop";
import Criteria from "../models/criteria";
import Insert from "../models/insert";
import Select from "../models/select";
import Task from "../models/task";
import data from "./data/index";
import Update from "../models/update";
import Column from "../models/column";
import { STATUS } from "../models/status";
import Delete from "../models/delete";
export default {
  get: async (id: number): Promise<any> => {
    let row: Object;
    try {
      let columns = await data.columns("tasks");
      let input: Select = {
        table: "users",
        columns: columns.map((x) => {
          return { name: x.name };
        }),
        criteria: [
          {
            column: "id",
            cop: COP.eq,
            value: id,
          },
        ],
      };
      let rows = await data.select(input);
      row = rows.shift();
    } catch (e) {}
    return row!;
  },
  list: async (criteria: Criteria[]): Promise<any> => {
    let rows: any[];
    try {
      let columns = await data.columns("tasks");
      let input: Select = {
        table: "tasks",
        columns: columns.map((x) => {
          return { name: x.name };
        }),
        criteria: criteria,
      };
      let rows = await data.select(input);
      rows = rows;
    } catch (e) {}
    return rows!;
  },
  add: async (args: Task) => {
    let input: Insert = {
      table: "tasks",
      columns: [
        {
          name: "title",
          value: args.title,
        },
        {
          name: "description",
          value: args?.description,
        },
        {
          name: "dedline",
          value: args?.dedline,
        },
        {
          name: "userid",
          value: args.userid,
        },
      ],
    };
    let result = await data.insert(input);
    console.log(result);
    return result;
  },
  update: async (args: Task) => {
    let columns: Column[] = [];
    if (args.title !== undefined) {
      columns.push({
        name: "title",
        value: args.title,
      });
    }
    if (args.description !== undefined) {
      columns.push({
        name: "description",
        value: args.description,
      });
    }
    if (args.dedline !== undefined) {
      columns.push({
        name: "dedline",
        value: args.dedline,
      });
    }
    switch (args.status) {
      case STATUS.INPROGRESS:
        columns.push({
          name: "startedat",
          value: new Date(),
        });
        break;
      case STATUS.DONE:
        columns.push({
          name: "startedat",
          value: new Date(),
        });
        break;
    }

    let input: Update = {
      table: "tasks",
      columns: columns,
      criteria: [
        {
          column: "id",
          cop: COP.eq,
          value: args.id,
        },
      ],
    };
    let result = await data.update(input);
    console.log(result);
    return result;
  },
  delete: async (id: number) => {
    let input: Delete = {
      table: "tasks",
      criteria: [
        {
          column: "id",
          cop: COP.eq,
          value: id,
        },
      ],
    };
    let result = await data.delete(input);
    console.log(result);
    return result;
  },
};
