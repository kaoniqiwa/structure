import { CrossingType } from 'src/app/enums/crossing-type.enum';
import { Lane } from '../lane.model';
import { IModel } from '../model.interface';
import { Resource } from './resource.model';

/** Crossing (卡口扩展信息) */
export class Crossing extends Resource implements IModel {
  /**	Int32	卡口类型 80-治安卡口，81-电子警察，82-其它卡口，	M	*/
  CrossingType!: CrossingType;
  /**	String	对应的摄像机ID	M	*/
  CameraId!: string;
  /**	Lane[]	车道	O	*/
  Lanes?: Lane[];
}
