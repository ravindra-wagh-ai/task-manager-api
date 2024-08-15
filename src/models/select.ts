import Column from "./column";
import Criteria from "./criteria";
import Paging from "./paging";
import Sorting from "./sorting";
export default class Select {
  public table?: string;
  //public mobile?: string;
  public columns?: Column[];
  public criteria?: Criteria[];
  public paging?: Paging;
  public sorting?: Sorting[];
}
