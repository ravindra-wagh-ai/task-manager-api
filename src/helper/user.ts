import data from "./data/index";
export default {
    getByEmail: async (email?: string): Promise<any> => {
        let row: Object;
        try {
            let columns = await data.columns("users");
            let input = {
                tables: [{
                    name: "users",
                    columns: columns.map((x)=> { return { name: x.name}})
                }],
                criteria: [{
                    column: "email",
                    cop: "eq",
                    value: email,
                }]
            };
            let rows = await data.select(input);
            row = rows.shift();
        } catch (e) {

        }
        return row!;
    }
};