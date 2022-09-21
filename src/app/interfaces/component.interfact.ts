import { IModel } from '../models/model.interface';
import { ExportTool } from '../tools/export.tool';
import { IBusiness } from './business.interface';
import { IExportConverter } from './converter.interface';

export interface IComponent<TModel extends IModel, TViewModel> {
  business: IBusiness<TModel, TViewModel>;
}
export interface IExportComponent<T> {
  exports: ExportTool;
  exportConverter: IExportConverter<T>;
}
