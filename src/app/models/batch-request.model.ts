import { IModel } from './model.interface';

/** BatchRequest (批量添加操作)	*/
export class BatchRequest implements IModel {
  /**	String[]	资源ID列表	M	*/
  ResourceIds!: string[];
  /**	Boolean	是否删除数据，默认：false	O	*/
  IsDelete?: boolean;
}
