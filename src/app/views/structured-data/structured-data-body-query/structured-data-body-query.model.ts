import { BodyModelingResult } from 'src/app/models/body-modeling-result.model';
import { Rectangle } from 'src/app/models/rectangle.modl';
import { StructuredDataQueryModel } from '../structured-data.model';

export class StructuredDataBodyQueryModel
  extends StructuredDataQueryModel
  implements BodyModelingResult
{
  /**	String	模型数据	O	*/
  ModelData?: string;
  /**	Rectangle	人体坐标	O	*/
  BodyRect?: Rectangle;
  /**	String	年龄段，参见：2.3.12.1	O	*/
  AgeGroup?: string;
  /**	String	年龄段说明	O	*/
  AgeGroupName?: string;
  /**	String	性别，参见：2.3.12.1	O	*/
  Gender?: string;
  /**	String	性别说明	O	*/
  GenderName?: string;
  /**	Boolean	是否戴眼镜，参见：2.3.12.1	O	*/
  Glass?: boolean;
  /**	String	是否戴眼镜说明	O	*/
  GlassName?: string;
  /**	Boolean	是否背包，参见：2.3.12.1	O	*/
  Bag?: boolean;
  /**	String	是否背包说明	O	*/
  BagName?: string;
  /**	Boolean	是否戴帽子，参见：2.3.12.1	O	*/
  Hat?: boolean;
  /**	String	是否戴帽子说明	O	*/
  HatName?: string;
  /**	Boolean	是否戴口罩，参见：2.3.12.1	O	*/
  Mask?: boolean;
  /**	String	是否戴口罩说明	O	*/
  MaskName?: string;
  /**	Boolean	是否拎东西，参见：2.3.12.1	O	*/
  Things?: boolean;
  /**	String	是否拎东西说明	O	*/
  ThingsName?: string;
  /**	String	发型，参见：2.3.12.1	O	*/
  HairStyle?: string;
  /**	String	发型说明	O	*/
  HairStyleName?: string;
  /**	String	上衣类型，参见：2.3.12.1	O	*/
  JacketType?: string;
  /**	String	上衣类型说明	O	*/
  JacketTypeName?: string;
  /**	String	下衣类型，参见：2.3.12.1	O	*/
  TrousersType?: string;
  /**	String	下衣类型说明	O	*/
  TrousersTypeName?: string;
  /**	String	上衣颜色，参见：2.3.12.1	O	*/
  JacketColor?: string;
  /**	String	上衣颜色说明	O	*/
  JacketColorName?: string;
  /**	String	下衣颜色，参见：2.3.12.1	O	*/
  TrousersColor?: string;
  /**	String	下衣颜色说明	O	*/
  TrousersColorName?: string;
  /**	Boolean	是否骑车，参见：2.3.12.1	O	*/
  Ride?: boolean;
  /**	String	是否骑车说明	O	*/
  RideName?: string;
  /**	String	骑车类型，参见：2.3.12.1	O	*/
  CyclingType?: string;
  /**	String	骑车类型说明	O	*/
  CyclingTypeName?: string;
  /**	String	骑车人数，参见：2.3.12.1	O	*/
  CyclingPersonNumber?: string;
  /**	String	骑车人数说明	O	*/
  CyclingPersonNumberName?: string;
}
