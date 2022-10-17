import { EventEmitter } from '@angular/core';
import { IConverter, IPromiseConverter } from './converter.interface';

export interface IBusiness<IModel, IViewModel> {
  Converter?:
    | IConverter<IModel, IViewModel>
    | IPromiseConverter<IModel, IViewModel>;

  loading?: EventEmitter<void>;
  load(...args: any): Promise<IViewModel>;
  getData(...args: any): Promise<IModel>;
}

export interface IRemoveBusiness<IModel, IViewModel>
  extends IBusiness<IModel, IViewModel> {
  remove(id: string): Promise<any>;
}
