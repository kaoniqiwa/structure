import { Transform } from 'class-transformer';
import { OnlineStatus } from 'src/app/enums/online-status.enum';
import { ResourceType } from 'src/app/enums/resource-type.enum';
import { IModel } from './model.interface';
import { transformDateTime } from './transform.model';

/** ResourceOnlineStatusRecord (资源在线状态变更记录)	*/
export class ResourceOnlineStatusRecord implements IModel {
  /**	String	唯一标识符	M	*/
  Id!: string;
  /**	DateTime	发生时间	M	*/
  @Transform(transformDateTime)
  Time!: Date;
  /**	Int32	状态：0-正常，1-异常/离线	M	*/
  OnlineStatus!: OnlineStatus;
  /**	String	资源ID	M	*/
  ResourceId!: string;
  /**	String	资源名称	M	*/
  ResourceName!: string;
  /**	String	"资源类型：
Camera：监控点
EncodeDevice：编码设备
IoTSensor：物联网传感器"	M	*/
  ResourceType!: ResourceType;
}
