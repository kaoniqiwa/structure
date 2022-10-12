import { TableSelectStateEnum } from 'src/app/enums/table-select-state.enum';
import { TableSelectStrategy } from './table-select.model';

export const config = [
  new TableSelectStrategy('全选', TableSelectStateEnum.All),
  new TableSelectStrategy('反选', TableSelectStateEnum.Reverse),
  new TableSelectStrategy('取消', TableSelectStateEnum.Cancel),
];
