import { IModel } from './model.interface';

/** Lane (车道) */
export class Lane implements IModel {
  /**	String	车道ID	M	*/
  Id!: string;
  /**	String	车道名称	O	*/
  Name?: string;
  /**	Int32	车道编号	O	*/
  LaneNo?: number;
  /**	String	方向描述	O	*/
  Direction?: string;
  /**	Double	限速，km/h	O	*/
  LimitSpeed?: number;
  /**	String	摄像机ID	O	*/
  CameraId?: string;
}
