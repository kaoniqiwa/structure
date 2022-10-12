import { TableSelectStateEnum } from "src/app/enums/table-select-state.enum";

export class TableSelectStrategy {
  constructor(public title: string, public type: TableSelectStateEnum) {}
}
