import { DialogEnum } from '../enums/dialog.enum';

export interface IDialogMessage<T> {
  type: DialogEnum;
  data: T;
}
