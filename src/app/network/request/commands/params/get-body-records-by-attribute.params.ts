import { Transform } from 'class-transformer';
import { transformParams } from 'src/app/models/transform.model';
import { PagedDurationParams } from 'src/app/network/IParams.interface';

export class GetBodyRecordsByAttributeParams extends PagedDurationParams {
  /**	String[]	过滤抓拍摄像机ID	O */
  CameraIds?: string[];
  /**
   *	String	排序字段
   *  CaptureTime：按抓拍时间排序	O
   */
  Sort?: 'CaptureTime';
  /**	String	排序(desc-降序，asc-升序)	O */
  Order?: string;
  /**	String	年龄段，参见：2.3.12.1	O */
  @Transform(transformParams)
  AgeGroup?: string;
  /**	Boolean	是否背包，参见：2.3.12.1	O */
  @Transform(transformParams)
  Bag?: boolean;
  /**	String	骑车类型，参见：2.3.12.1	O */
  @Transform(transformParams)
  CyclingType?: string;
  /**	String	骑车人数，参见：2.3.12.1	O */
  @Transform(transformParams)
  CyclingPersonNumber?: string;
  /**	String	性别，参见：2.3.12.1	O */
  @Transform(transformParams)
  Gender?: string;
  /**	Boolean	是否戴眼镜，参见：2.3.12.1	O */
  @Transform(transformParams)
  Glass?: boolean;
  /**	String	发型，参见：2.3.12.1	O */
  @Transform(transformParams)
  HairStyle?: string;
  /**	Boolean	是否戴帽子，参见：2.3.12.1	O */
  @Transform(transformParams)
  Hat?: boolean;
  /**	String	上衣类型，参见：2.3.12.1	O */
  @Transform(transformParams)
  JacketType?: string;
  /**	String	下衣类型，参见：2.3.12.1	O */
  @Transform(transformParams)
  TrousersType?: string;
  /**	String	上衣颜色，参见：2.3.12.1	O */
  @Transform(transformParams)
  JacketColor?: string;
  /**	String	下衣颜色，参见：2.3.12.1	O */
  @Transform(transformParams)
  TrousersColor?: string;
  /**	Boolean	是否骑车，参见：2.3.12.1	O */
  @Transform(transformParams)
  Ride?: boolean;
  /**	Boolean	是否戴口罩，参见：2.3.12.1	O */
  @Transform(transformParams)
  Mask?: boolean;
  /**	Boolean	是否拎东西，参见：2.3.12.1	O */
  @Transform(transformParams)
  Things?: boolean;
  /**	String	人脸人体关联id	O */
  LinkFaceId?: string;
}
