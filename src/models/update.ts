import Column from "./column";
import Criteria from "./criteria";

export default class Update {
  public table?: string;
  public columns?: Column[];
  public criteria?: Criteria[];
  public values?: any[];
}
