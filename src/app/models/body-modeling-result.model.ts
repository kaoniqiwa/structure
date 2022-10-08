import { Transform } from 'class-transformer';
import { IModel } from './model.interface';
import { Rectangle } from './rectangle.modl';
import { transformKeyValue } from './transform.model';

/** BodyModelingResult (人体建模结果) */
export class BodyModelingResult implements IModel {
  /**	String	模型数据	O	*/
  ModelData?: string;
  /**	Rectangle	人体坐标	O	*/
  BodyRect?: Rectangle;
  /**	String	年龄段，参见：2.3.12.1	O	*/
  @Transform(transformKeyValue)
  AgeGroup?: string;
  /**	String	年龄段说明	O	*/
  AgeGroupName?: string;
  /**	String	性别，参见：2.3.12.1	O	*/
  @Transform(transformKeyValue)
  Gender?: string;
  /**	String	性别说明	O	*/
  GenderName?: string;
  /**	Boolean	是否戴眼镜，参见：2.3.12.1	O	*/
  @Transform(transformKeyValue)
  Glass?: boolean;
  /**	String	是否戴眼镜说明	O	*/
  GlassName?: string;
  /**	Boolean	是否背包，参见：2.3.12.1	O	*/
  @Transform(transformKeyValue)
  Bag?: boolean;
  /**	String	是否背包说明	O	*/
  BagName?: string;
  /**	Boolean	是否戴帽子，参见：2.3.12.1	O	*/
  @Transform(transformKeyValue)
  Hat?: boolean;
  /**	String	是否戴帽子说明	O	*/
  HatName?: string;
  /**	Boolean	是否戴口罩，参见：2.3.12.1	O	*/
  @Transform(transformKeyValue)
  Mask?: boolean;
  /**	String	是否戴口罩说明	O	*/
  MaskName?: string;
  /**	Boolean	是否拎东西，参见：2.3.12.1	O	*/
  @Transform(transformKeyValue)
  Things?: boolean;
  /**	String	是否拎东西说明	O	*/
  ThingsName?: string;
  /**	String	发型，参见：2.3.12.1	O	*/
  @Transform(transformKeyValue)
  HairStyle?: string;
  /**	String	发型说明	O	*/
  HairStyleName?: string;
  /**	String	上衣类型，参见：2.3.12.1	O	*/
  @Transform(transformKeyValue)
  JacketType?: string;
  /**	String	上衣类型说明	O	*/
  JacketTypeName?: string;
  /**	String	下衣类型，参见：2.3.12.1	O	*/
  @Transform(transformKeyValue)
  TrousersType?: string;
  /**	String	下衣类型说明	O	*/
  TrousersTypeName?: string;
  /**	String	上衣颜色，参见：2.3.12.1	O	*/
  @Transform(transformKeyValue)
  JacketColor?: string;
  /**	String	上衣颜色说明	O	*/
  JacketColorName?: string;
  /**	String	下衣颜色，参见：2.3.12.1	O	*/
  @Transform(transformKeyValue)
  TrousersColor?: string;
  /**	String	下衣颜色说明	O	*/
  TrousersColorName?: string;
  /**	Boolean	是否骑车，参见：2.3.12.1	O	*/
  @Transform(transformKeyValue)
  Ride?: boolean;
  /**	String	是否骑车说明	O	*/
  RideName?: string;
  /**	String	骑车类型，参见：2.3.12.1	O	*/
  @Transform(transformKeyValue)
  CyclingType?: string;
  /**	String	骑车类型说明	O	*/
  CyclingTypeName?: string;
  /**	String	骑车人数，参见：2.3.12.1	O	*/
  @Transform(transformKeyValue)
  CyclingPersonNumber?: string;
  /**	String	骑车人数说明	O	*/
  CyclingPersonNumberName?: string;
}
