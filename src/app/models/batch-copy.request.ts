import { IModel } from './model.interface';

/** BatchCopyRequest (批量拷贝)	*/
export class BatchCopyRequest implements IModel {
  /**	String[]	资源ID列表	M	*/
  ResourceIds!: string[];
  /**	Boolean	是否删除已存在的数据，默认：true	O	*/
  DeleteExisted?: boolean;
}
