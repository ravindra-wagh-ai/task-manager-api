import insertRow from "./insert";
import selectRow from "./select";
import deleteRow from "./delete";
import updateRow from "./update";
import count from "./count";
import columns from "./columns";
export default {
  count: count,
  insert: insertRow,
  delete: deleteRow,
  select: selectRow,
  update: updateRow,
  columns: columns,
};
