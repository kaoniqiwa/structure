import { Transform } from 'class-transformer';
import { IOStatus } from '../enums/io-status.enum';
import { ResourceType } from '../enums/resource-type.enum';
import { IModel } from './model.interface';
import { transformDateTime } from './transform.model';

/** CameraIOStatus (监控点IO状态) */
export class CameraIOStatus implements IModel {
  /**	String	唯一标识符	M	*/
  Id!: string;
  /**	String	资源名称	M	*/
  Name!: string;
  /**	String	资源类型：Camera：监控点	M	*/
  ResourceType!: ResourceType;
  /**	Int32	IO状态，0-消警，1-报警	M	*/
  IOStatus!: IOStatus;
  /**	DateTime	更新时间	M	*/
  @Transform(transformDateTime)
  UpdateTime!: Date;
}
