import { Transform } from 'class-transformer';
import { IModel } from './model.interface';
import { transformDateTime } from './transform.model';

/** Map (地图信息)	*/
export class Map implements IModel {
  /**	String	唯一标识符	M	*/
  Id!: string;
  /**	String	MD5字符串	O	*/
  MD5?: string;
  /**	String	地图名称	M	*/
  Name!: string;
  /**	DateTime	创建时间	M	*/
  @Transform(transformDateTime)
  CreateTime!: Date;
  /**	DateTime	更新时间	M	*/
  @Transform(transformDateTime)
  UpdateTime!: Date;
  /**	String	描述信息	O	*/
  Description?: string;
}
