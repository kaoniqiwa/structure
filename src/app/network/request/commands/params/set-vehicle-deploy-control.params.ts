import { Transform } from 'class-transformer';
import { VehicleReason } from 'src/app/enums/vehicle-reason.enum';
import { transformParams } from 'src/app/models/transform.model';
import { DurationParams } from 'src/app/network/IParams.interface';

export class SetVehicleDeployControlParams extends DurationParams {
  /**	String 	布控任务ID	M */
  TaskId!: string;
  /**	String	布控名称	M */
  TaskName!: string;
  /**	String[]	布控相机ID，最多传2000个	M */
  CameraIds!: string[];
  /**	String[]	卡口ID，最多传2000个	O */
  CrossingIds?: string[];
  /**	String	车牌号（支持模糊查询）：A233J5	M */
  PlateNo!: string;
  /**	String	车牌颜色，参见：2.3.12.2	M */
  @Transform(transformParams)
  PlateColor!: string;
  /**	Int32	布控原因（1-被盗车，2-被抢车，3-嫌疑车）	M */
  Reason!: VehicleReason;
  /**	String	描述	O */
  Remark?: string;
  /**	String	车辆品牌	O */
  VehicleLogo?: string;
  /**	String	车辆类型，参见：2.3.12.2	O */
  @Transform(transformParams)
  VehicleType?: string;
  /**	String	车辆颜色，参见：2.3.12.2	O */
  @Transform(transformParams)
  VehicleColor?: string;
}
