import { IModel } from './model.interface';
import { Rectangle } from './rectangle.modl';

/** FaceModelingResult (人脸建模结果) */
export class FaceModelingResult implements IModel {
  /**	String	模型数据	O	*/
  ModelData?: string;
  /**	Rectangle	人脸坐标	O	*/
  FaceRect?: Rectangle;
  /**	String	性别，参见：2.3.12.1	O	*/
  Gender?: string;
  /**	String	性别说明	O	*/
  GenderName?: string;
  /**	Boolean	是否戴眼镜，参见：2.3.12.1	O	*/
  Glass?: boolean;
  /**	String	是否戴眼镜说明	O	*/
  GlassName?: string;
  /**	String	年龄段，参见：2.3.12.1	O	*/
  AgeGroup?: string;
  /**	String	年龄段说明	O	*/
  AgeGroupName?: string;
  /**	Boolean	是否微笑，参见：2.3.12.1	O	*/
  Smile?: boolean;
  /**	String	是否微笑说明	O	*/
  SmileName?: string;
}
