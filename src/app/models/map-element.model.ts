import { Transform } from 'class-transformer';
import { GisPoint } from './gis-point.model';
import { IModel } from './model.interface';
import { Resource } from './resource/resource.model';

import { transformDateTime } from './transform.model';

/** MapElement (地图元素)	*/
export class MapElement implements IModel {
  /**	String	唯一标识符	M	*/
  Id!: string;
  /**	String	资源名称	M	*/
  Name!: string;
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

  /**	Int32	元素类型，类型决定元素图标	M	*/
  ElementType!: number;
  /**	String	所属的地图ID	M	*/
  MapId!: string;
  /**	Resource[]	资源集合，层次太多，暂时不支持	O	*/
  Resources?: Resource[];
}
