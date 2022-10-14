import { Transform } from 'class-transformer';
import { OrderType } from 'src/app/enums/order-type.enum';
import { transformParams } from 'src/app/models/transform.model';
import { PagedDurationParams } from 'src/app/network/IParams.interface';

export class GetFaceRecordsByAttributeParams extends PagedDurationParams {
  /**	String[]	过滤抓拍摄像机ID	O */
  CameraIds?: string[];
  /**	String	姓名	O */
  Name?: string;
  /**	String	性别，参见：2.3.12.1	O */
  @Transform(transformParams)
  Gender?: string;
  /**	String	年龄段，参见：2.3.12.1	O */
  @Transform(transformParams)
  AgeGroup?: string;
  /**	String	证件号码	O */
  CertificateNumber?: string;
  /**	Boolean	是否戴眼镜，参见：2.3.12.1	O */
  @Transform(transformParams)
  Glass?: boolean;
  /**	Boolean	是否微笑，参见：2.3.12.1	O */
  @Transform(transformParams)
  Smile?: boolean;
  /**	String	人脸人体关联id（若该值有内容，可以作为查询条件，进行人体的属性检索，查询出对应的人体记录）	O */
  LinkBodyId?: string;
  /**	String	人脸车辆关联id（若该值有内容，可以作为查询条件，进行过车的属性检索，查询出对应的过车记录）	O */
  LinkVehicleId?: string;
  /**	String	关联的车牌号码（若该值有内容，可以作为查询条件，进行过车的属性检索，查询出对应的过车记录）	O */
  PlateNo?: string;
  /**	String	排序字段CaptureTime：按抓拍时间排序	O */
  Sort?: 'CaptureTime';
  /**	String	排序(desc-降序，asc-升序)	O */
  Order?: OrderType;
}
