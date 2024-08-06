import { COP } from "./cop";
import { LOP } from "./lop";

export default class Criteria {
  public column?: string;
  public cop?: COP;
  public lop?: LOP;
  public value?: string;
}
