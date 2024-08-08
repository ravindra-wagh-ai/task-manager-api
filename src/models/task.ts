import { STATUS } from "./status";

export default class Task {
  public id?: number;
  public title?: string;
  public description?: string;
  public deadline?: Date;
  public userid?: number;
  public status?: STATUS = STATUS.OPEN;
}
