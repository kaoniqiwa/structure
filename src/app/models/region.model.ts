import { Transform } from 'class-transformer';
import { IModel } from './model.interface';
import { transformDateTime } from './transform.model';

/** Region (区域)	*/
export class Region implements IModel {
  /**	String	区域ID	M	*/
  Id!: string;
  /**	String	区域名称	M	*/
  Name!: string;
  /**	String	父区域ID，如果是根区域节点，则该ID为空	O	*/
  ParentId?: string;
  /**	Boolean	是否为叶节点的区域	M	*/
  IsLeaf!: boolean;
  /**	String	外部扩展ID，用于国标等区分区域的编码	O	*/
  ExternalId?: string;
  /**	String	区域完整路径，含本节点，@进行分割，上级节点在前	O	*/
  RegionPath?: string;
  /**	String	描述信息	O	*/
  Description?: string;
  /**	Int32	区域类型，用于图标区分	M	*/
  RegionType!: number;
  /**	DateTime	创建时间	M	*/
  @Transform(transformDateTime)
  CreateTime!: Date;
  /**	DateTime	更新事件	M	*/
  @Transform(transformDateTime)
  UpdateTime!: Date;
}
