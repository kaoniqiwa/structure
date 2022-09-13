import { Transform } from 'class-transformer';
import { IModel } from './model.interface';
import { transformDateTime } from './transform.model';

/** PictureUrl (照片信息)	*/
export class PictureUrl implements IModel {
  /**	String	图片ID	M	*/
  Id!: string;
  /**	String	图片URL地址	M	*/
  Url!: string;
  /**	DateTime	创建时间	M	*/
  @Transform(transformDateTime)
  CreateTime!: Date;
}
