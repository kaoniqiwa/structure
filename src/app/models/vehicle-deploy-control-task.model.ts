import { Transform } from 'class-transformer';
import { VehicleReason } from '../enums/vehicle-reason.enum';
import { IModel } from './model.interface';
import { transformDateTime } from './transform.model';

/** VehicleDeployControlTask (车牌布控任务) */
export class VehicleDeployControlTask implements IModel {
  /**	String	任务ID	M	*/
  TaskId!: string;
  /**	String	布控名称	M	*/
  TaskName!: string;
  /**	String[]	布控相机ID，最多传2000个	M	*/
  CameraIds!: string[];
  /**	String[]	卡口ID，最多传2000个	O	*/
  CrossingIds?: string[];
  /**	DateTime	开始时间（有效期）	M	*/
  @Transform(transformDateTime)
  BeginTime!: Date;
  /**	DateTime	结束时间（有效期）	M	*/
  @Transform(transformDateTime)
  EndTime!: Date;
  /**	String	车牌号（支持模糊查询）：A233J5	M	*/
  PlateNo!: string;
  /**	String	车牌颜色，参见：2.3.12.2	M	*/
  PlateColor!: string;
  /**	String	车辆颜色说明		*/
  PlateColorName?: string;
  /**	Int32	布控原因（1-被盗车，2-被抢车，3-嫌疑车）	M	*/
  Reason!: VehicleReason;
  /**	String	描述	O	*/
  Remark?: string;
  /**	String	车辆品牌	O	*/
  VehicleLogo?: string;
  /**	String	车辆品牌说明		*/
  VehicleLogoName?: string;
  /**	String	车辆类型，参见：2.3.12.2	O	*/
  VehicleType?: string;
  /**	String	车辆类型说明	O	*/
  VehicleTypeName?: string;
  /**	String	车辆颜色，参见：2.3.12.2	O	*/
  VehicleColor?: string;
  /**	String	车辆颜色说明	O	*/
  VehicleColorName?: string;
}
