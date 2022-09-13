import { Transform } from 'class-transformer';
import { IModel } from './model.interface';
import { Rectangle } from './rectangle.modl';
import { transformDateTime } from './transform.model';

/** FaceRecord (人脸记录) */
export class FaceRecord implements IModel {
  /**	String	记录ID	M	*/
  Id!: string;
  /**	String	姓名	O	*/
  Name?: string;
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
  /**	String	人脸图片url	O	*/
  FacePictureUrl?: string;
  /**	String	背景图片url	O	*/
  BackgroundUrl?: string;
  /**	Boolean	是否微笑，参见：2.3.12.1	O	*/
  Smile?: boolean;
  /**	String	是否微笑说明	O	*/
  SmileName?: string;
  /**	String	证件号码	O	*/
  CertificateNumber?: string;
  /**	String	摄像机ID	O	*/
  CameraId?: string;
  /**	String	摄像机名称	O	*/
  CameraName?: string;
  /**	String	人脸人体关联id。如需查询该人脸相关的人体信息	O	*/
  LinkBodyId?: string;
  /**	String	人脸车辆关联id。如需查询该人脸相关的车辆信息	O	*/
  LinkVehicleId?: string;
  /**	String	关联的车牌号码	O	*/
  PlateNo?: string;
  /**	DateTime	抓拍时间	O	*/
  @Transform(transformDateTime)
  CaptureTime?: Date;
  /**	Rectangle	人脸坐标	O	*/
  FaceRect?: Rectangle;
  /**	Double	相似度（取值范围: 0-1， 精确到小数点后2位）属性查询时无效。	O	*/
  Similarity?: number;
}
