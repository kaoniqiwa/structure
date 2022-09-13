import { ResourceType } from '../enums/resource-type.enum';
import { IModel } from './model.interface';

/** ResourceThumbnail (资源缩略信息)	*/
export class ResourceThumbnail implements IModel {
  /**	String	唯一标识符	M	*/
  Id!: string;
  /**	String	资源名称	M	*/
  Name!: string;
  /**	String	"资源类型：
Camera：监控点
EncodeDevice：编码设备
IoTSensor：物联网传感器"	M	*/
  ResourceType!: ResourceType;
}
