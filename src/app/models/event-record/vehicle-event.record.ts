import { Transform, Type } from 'class-transformer';
import { IModel } from '../model.interface';
import { transformRecordName } from '../transform.model';
import { EventRecord } from './event.record';
import 'reflect-metadata';

/** VehicleEventData (车辆事件数据) */
export class VehicleEventData implements IModel {
  /**	String	布控任务名称	O	*/
  TaskName?: string;
  /**	String	布控任务ID	O	*/
  TaskId?: string;
  /**	String	车牌号码	O	*/
  PlateNo?: string;
  /**	String	车牌颜色:common.plate_color	O	*/
  PlateColor?: string;

  /**	String	车牌颜色名称	O	*/
  @Transform(transformRecordName)
  PlateColorName?: string;
  /**	String	车牌类型 common.plate_type		*/
  PlateType?: string;

  /**	String	车辆类型名称	O	*/
  @Transform(transformRecordName)
  PlateTypeName?: string;
  /**	String	车牌照片	O	*/
  PlateImageUrl?: string;
  /**	String	车身颜色:common.vehicle_color 	O	*/
  VehicleColor?: string;

  /**	String	车身颜色名称	O	*/
  @Transform(transformRecordName)
  VehicleColorName?: string;
  /**	String	车身颜色深浅:common.vehicle_color_depth	O	*/
  VehicleColorDepth?: string;

  /**	String	车身颜色深浅名称	O	*/
  @Transform(transformRecordName)
  VehicleColorDepthName?: string;
  /**	String	车辆品牌(暂时不支持):common.vehicle_logo	O	*/
  VehicleLogo?: string;

  /**	String	车辆品牌名称	O	*/
  @Transform(transformRecordName)
  VehicleLogoName?: string;
  /**	String	车辆子品牌：(暂时不支持):common.vehicle_sub_logo	O	*/
  VehicleSubLogo?: string;

  /**	String	车辆子品牌名称	O	*/
  @Transform(transformRecordName)
  VehicleSubLogoName?: string;
  /**	String	车辆年款	O	*/
  VehicleModel?: string;
  /**	String	车辆年款名称	O	*/
  @Transform(transformRecordName)
  VehicleModelName?: string;
  /**	Double	车速：km/h	O	*/
  VehicleSpeed?: number;
  /**	Boolean	主驾驶安全带:common.pilot_belt_safe	O	*/
  PilotSafebelt?: boolean;

  /**	String	主驾驶安全带名称：true：系安全带、false:未系安全带、未知	O	*/
  @Transform(transformRecordName)
  PilotSafebeltName?: string;
  /**	Boolean	副驾驶安全带:common.pilot_belt_safe	O	*/
  VicePilotSafebelt?: boolean;

  /**	String	副驾驶安全带名称：true：系安全带、false:未系安全带、未知	O	*/
  @Transform(transformRecordName)
  VicePilotSafebeltName?: string;
  /**	Boolean	主遮阳板状态:common.pilot_sunvisor_open	O	*/
  PilotSunvisor?: boolean;

  /**	String	主遮阳板状态名称true：打开、false:未打开、未知	O	*/
  @Transform(transformRecordName)
  PilotSunvisorName?: string;
  /**	Boolean	副遮阳板状态:common.pilot_sunvisor_open	O	*/
  VicePilotSunvisor?: boolean;

  /**	String	副遮阳板状态名称true：打开、false:未打开、未知	O	*/
  @Transform(transformRecordName)
  VicePilotSunvisorName?: string;
  /**	Boolean	打电话状态：common.pilot_on_phone	O	*/
  UsePhone?: boolean;

  /**	String	打电话状态名称true：打电话、false:未打电话、未知	O	*/
  @Transform(transformRecordName)
  UsePhoneName?: string;
  /**	Double	移动设备经度	O	*/
  MobileDeviceLongitude?: number;
  /**	Double	移动设备纬度	O	*/
  MobileDeviceLatitude?: number;
  /**	Boolean	挂件状态：common.vehicle_pendant	O	*/
  Pendant?: boolean;

  /**	String	挂件状态名称：true：有挂件、false：未挂挂件、未知	O	*/
  @Transform(transformRecordName)
  PendantName?: string;

  /**	String	危险品状态：unknown-未知，green-绿标，yellow-黄标 common.vehicle_has_dangerous_mark	O	*/
  DangMark?: string;

  /**	String	危险品状态名称	O	*/
  @Transform(transformRecordName)
  DangMarkName?: string;
  /**	String	过车ID	O	*/
  PassingId?: string;
  /**	String	卡口ID	O	*/
  CrossingId?: string;
  /**	String	卡口名称	O	*/
  @Transform(transformRecordName)
  CrossingName?: string;
  /**	String	方向：common.vehicle_direction	O	*/
  Direction?: string;

  /**	String	方向名称	O	*/
  @Transform(transformRecordName)
  DirectionName?: string;
}

/** VehicleEventRecord (车辆布控事件) */
export class VehicleEventRecord extends EventRecord implements IModel {
  /**	VehicleEventData	车辆事件内容	M	*/
  @Type(() => VehicleEventData)
  Data!: VehicleEventData;
}
