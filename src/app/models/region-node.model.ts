import { Transform } from 'class-transformer';
import { OnlineStatus } from '../enums/online-status.enum';
import { OrderType } from '../enums/order-type.enum';
import { RegionNodeType } from '../enums/region-node-type.enum';
import { ResourceType } from '../enums/resource-type.enum';
import { IModel } from './model.interface';
import { Camera } from './resource/camera.resource';
import { transformDateTime } from './transform.model';

/** RegionNode (区域节点)	*/
export class RegionNode implements IModel {
  /**	String	节点ID	M */
  Id!: string;
  /**	String	名称	M */
  Name!: string;
  /**	String	所属区域ID	M */
  RegionId!: string;
  /**	String	完整路径，含本节点，@进行分割，上级节点在前	O */
  Path?: string;
  /**	String	描述信息	O */
  Description?: string;
  /**	String	资源ID	M */
  ResourceId!: string;
  /**	String	资源类型：  Camera，ResourceCollection	M */
  ResourceType!: ResourceType;
  /**	Int32	节点类型，用于图标区分，  1：人脸、人体相机，2：车辆卡口相机。	O */
  NodeType?: RegionNodeType;
  /**	Int32	顺序，0开始	O */
  Order?: number;
  /**	DateTime	创建时间	O */
  @Transform(transformDateTime)
  CreateTime?: Date;
  /**	DateTime	更新时间	O */
  @Transform(transformDateTime)
  UpdateTime?: Date;
  /**	Int32	在线状态0-正常，1-离线	O */
  OnlineStatus?: OnlineStatus;
}
export class CameraRegionNode extends RegionNode {
  getCamera!: (camera: string) => Promise<Camera>;
  camera?: Camera;
}
