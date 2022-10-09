import { Transform } from 'class-transformer';
import { IModel } from './model.interface';
import { Rectangle } from './rectangle.modl';
import { transformDateTime, transformRecordName } from './transform.model';

/** BodyRecord (人体记录) */
export class BodyRecord implements IModel {
  /**	String	记录ID	M	*/
  Id!: string;
  /**	Double	经度	O	*/
  Longitude?: number;
  /**	Double	纬度	O	*/
  Latitude?: number;
  /**	DateTime	抓拍时间	O	*/
  @Transform(transformDateTime)
  CaptureTime?: Date;
  /**	String	相机ID	O	*/
  CameraId?: string;
  /**	String	相机名称	O	*/
  @Transform(transformRecordName)
  CameraName?: string;
  /**	String	速度	O	*/
  Speed?: string;
  /**	Rectangle	目标坐标	O	*/
  TargetRect?: Rectangle;
  /**	String	目标大小，参见：2.3.12.1	O	*/
  TargetSize?: string;
  /**	String	目标大小说明	O	*/
  @Transform(transformRecordName)
  TargetSizeName?: string;
  /**	String	人体目标图片Url	O	*/
  TargetPictureUrl?: string;
  /**	String	背景图片url	O	*/
  BackgroundUrl?: string;
  /**	String	年龄段，参见：2.3.12.1	O	*/
  AgeGroup?: string;
  /**	String	年龄段说明	O	*/
  @Transform(transformRecordName)
  AgeGroupName?: string;
  /**	String	性别，参见：2.3.12.1	O	*/
  Gender?: string;
  /**	String	性别说明	O	*/
  @Transform(transformRecordName)
  GenderName?: string;
  /**	Boolean	是否戴眼镜，参见：2.3.12.1	O	*/
  Glass?: boolean;
  /**	String	是否戴眼镜说明	O	*/
  @Transform(transformRecordName)
  GlassName?: string;
  /**	Boolean	是否背包，参见：2.3.12.1	O	*/
  Bag?: boolean;
  /**	String	是否背包说明	O	*/
  @Transform(transformRecordName)
  BagName?: string;
  /**	Boolean	是否戴帽子，参见：2.3.12.1	O	*/
  Hat?: boolean;
  /**	String	是否戴帽子说明	O	*/
  @Transform(transformRecordName)
  HatName?: string;
  /**	Boolean	是否戴口罩，参见：2.3.12.1	O	*/
  Mask?: boolean;
  /**	String	是否戴口罩说明	O	*/
  @Transform(transformRecordName)
  MaskName?: string;
  /**	Boolean	是否拎东西，参见：2.3.12.1	O	*/
  Things?: boolean;
  /**	String	是否拎东西说明	O	*/
  @Transform(transformRecordName)
  ThingsName?: string;
  /**	String	发型，参见：2.3.12.1	O	*/
  HairStyle?: string;
  /**	String	发型说明	O	*/
  @Transform(transformRecordName)
  HairStyleName?: string;
  /**	String	上衣类型，参见：2.3.12.1	O	*/
  JacketType?: string;
  /**	String	上衣类型说明	O	*/
  @Transform(transformRecordName)
  JacketTypeName?: string;
  /**	String	下衣类型，参见：2.3.12.1	O	*/
  TrousersType?: string;
  /**	String	下衣类型说明	O	*/
  @Transform(transformRecordName)
  TrousersTypeName?: string;
  /**	String	上衣颜色，参见：2.3.12.1	O	*/
  JacketColor?: string;
  /**	String	上衣颜色说明	O	*/
  @Transform(transformRecordName)
  JacketColorName?: string;
  /**	String	下衣颜色，参见：2.3.12.1	O	*/
  TrousersColor?: string;
  /**	String	下衣颜色说明	O	*/
  @Transform(transformRecordName)
  TrousersColorName?: string;
  /**	Boolean	是否骑车，参见：2.3.12.1	O	*/
  Ride?: boolean;
  /**	String	是否骑车说明	O	*/
  @Transform(transformRecordName)
  RideName?: string;
  /**	String	骑车类型，参见：2.3.12.1	O	*/
  CyclingType?: string;
  /**	String	骑车类型说明	O	*/
  @Transform(transformRecordName)
  CyclingTypeName?: string;
  /**	String	骑车人数，参见：2.3.12.1	O	*/
  CyclingPersonNumber?: string;
  /**	String	骑车人数说明	O	*/
  @Transform(transformRecordName)
  CyclingPersonNumberName?: string;
}
