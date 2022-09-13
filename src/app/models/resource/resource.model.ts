import { Transform } from 'class-transformer';
import { ResourceType } from '../../enums/resource-type.enum';
import { GisPoint } from '../gis-point.model';
import { IModel } from '../model.interface';
import { PlatformAssociation } from '../platform-association.model';
import { ResourceLabel } from '../resource-label.model';
import { transformDateTime } from '../transform.model';
/** Resource (资源信息)	*/
export class Resource implements IModel {
  /**	String	唯一标识符	M	*/
  Id!: string;
  /**	String	资源名称	M	*/
  Name!: string;
  /**
   *  String	资源类型：
   *  Camera：监控点
   *  EncodeDevice：编码设备
   *  IoTSensor：物联网传感器
   *  Crossing：卡口
   * 	M
   * */
  ResourceType!: ResourceType;

  /**	String	父资源节点ID	O	*/
  ParentResourceId?: string;
  /**	String	描述	O	*/
  Description?: string;
  /**	DateTime	创建时间	M	*/
  @Transform(transformDateTime)
  CreateTime!: Date;
  /**	DateTime	更新事件	M	*/
  @Transform(transformDateTime)
  UpdateTime!: Date;
  /**	String	区域路径，路径ID1@路径ID2@路径ID3	O	*/
  RegionPath?: string;

  /**	String	区域路径名称，路径名1@路径名2@路径名3	O	*/
  RegionPathName?: string;

  /**	GisPoint	GIS坐标	O	*/
  GisPoint?: GisPoint;
  /**	PlatformAssociation	平台关联信息	O	*/
  Platform?: PlatformAssociation;
  /**	ResourceLabel[]	资源标签，用于分类和检索资源	O	*/
  Labels?: ResourceLabel[];
  /**	String	所属地图元素ID	O	*/
  MapElementId?: string;
  /**	String	所属区域ID	O	*/
  RegionId?: string;
}
