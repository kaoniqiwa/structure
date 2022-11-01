import { Transform, Type } from 'class-transformer';
import { IntelligentType } from 'src/app/enums/intelligent-type.enum';
import { IModel } from '../model.interface';
import { transformRecordName } from '../transform.model';
import { EventRecord } from './event.record';
import 'reflect-metadata';
/** MuckCarEventData (渣土车事件数据) */
export class MuckCarEventData implements IModel {
  /**	String	车牌号码	O	*/
  @Transform(transformRecordName)
  PlateNo?: string;
  /**	String	车牌颜色:common.plate_color	O	*/
  PlateColor?: string;

  /**	String	车牌颜色名称	O	*/
  @Transform(transformRecordName)
  PlateColorName?: string;
  /**	String	车身颜色:common.vehicle_color 	O	*/
  VehicleColor?: string;

  /**	String	车身颜色名称	O	*/
  @Transform(transformRecordName)
  VehicleColorName?: string;
  /**	String	车辆图片url	O	*/
  ThumbnailUrl?: string;
  /**	String	背景图片url	O	*/
  BackgroundImageUrl?: string;
  /**	Int32	AI识别原始违规类型;101-黑车,10-后盖异常	O	*/
  IntelligentType?: IntelligentType;
  /**	String	违规类型名称	O	*/
  @Transform(transformRecordName)
  IntelligentTypeName?: string;

  /**	String	过车ID	O	*/
  PassingId?: string;
  /**	String	卡口ID	O	*/
  CrossingId?: string;
  /**	String	卡口名称	O	*/
  CrossingName?: string;
}
/** MuckCarEventRecord (渣土车布控事件) */
export class MuckCarEventRecord extends EventRecord implements IModel {
  /**	MuckCarEventData	车辆事件内容	M	*/
  @Type(() => MuckCarEventData)
  Data!: MuckCarEventData;
}
