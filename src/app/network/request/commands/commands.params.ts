import { Transform, Type } from 'class-transformer';
import { OrderType } from 'src/app/enums/order-type.enum';
import { VehicleReason } from 'src/app/enums/vehicle-reason.enum';
import { DeployDetails } from 'src/app/models/deploy-details.model';
import { transformParams } from 'src/app/models/transform.model';
import {
  DurationParams,
  ImageParams,
  PagedDurationParams,
  PagedParams,
} from '../../IParams.interface';

export class FaceImageModelingParams extends ImageParams {}
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
export class GetFaceRecordsByImageParams extends PagedDurationParams {
  /**	String[]	支持传多张图片二进制数据（当图片中无法检测出人脸目标，会提示错误。上传多个目标图片时，条件是“或”的关系。默认使用公司最优算法进行检测建模）	O */
  ImageDatas?: string[];
  /**	String[]	模型数据	O */
  ModelDatas?: string[];
  /**	String[]	过滤抓拍摄像机ID	O */
  CameraIds?: string[];
  /**	Double	模型对比最小阈值（取值范围: 0-1，精确到小数点后2位）	O */
  MinSimilarity?: number;
  /**	Int32	模型比对结果的最大数目(以脸搜脸查询期望返回结果的最大个数，默认为1000)	O */
  MaxResults?: number;
  /**
   *	String	排序字段
   *  Similarity：按相似度排序
   *  CaptureTime：按抓拍时间排序	O
   */
  Sort?: 'Similarity' | 'CaptureTime';
  /**	String	排序(desc-降序，asc-升序)	O */
  Order?: OrderType;
}
export class CreateFaceDeployControlParams extends DurationParams {
  /**	String	布控名称	M */
  TaskName!: string;
  /**	String[]	布控相机ID，最多传2000个	M */
  CameraIds!: string[];
  /**	String	图片base64数据	O */
  ImageData?: string;
  /**	String	姓名	O */
  Name?: string;
  /**	String	性别，参见：2.3.12.1	O */
  @Transform(transformParams)
  Gender?: string;
  /**	Date	出生日期	O */
  BornTime?: Date;
  /**	Int32	证件类型，参见：2.3.12.1	O */
  @Transform(transformParams)
  CertificateType?: number;
  /**	String	证件号码	O */
  CertificateNumber?: string;
  /**	String	描述备注	O */
  Remark?: string;
  /**	DeployDetails[]	布控报警时间段和阈值	M */
  @Type(() => DeployDetails)
  Details?: DeployDetails[];
}
export class SetFaceDeployControlParams extends DurationParams {
  /**	String	布控任务ID	M */
  TaskId!: string;
  /**	String	布控名称	M */
  TaskName!: string;
  /**	String[]	布控相机ID，最多传2000个	M */
  CameraIds!: string[];
  /**	String	图片base64数据	O */
  ImageData?: string;
  /**	String	姓名	O */
  Name?: string;
  /**	String	性别，参见：2.3.12.1	O */
  @Transform(transformParams)
  Gender?: string;
  /**	Date	出生日期	O */
  BornTime?: Date;
  /**	Int32	证件类型，参见：2.3.12.1	O */
  @Transform(transformParams)
  CertificateType?: number;
  /**	String	证件号码	O */
  CertificateNumber?: string;
  /**	String	描述备注	O			 */
  Remark?: string;
  /**	DeployDetails[]	布控报警时间段和阈值	M */
  Details!: DeployDetails[];
}
export class GetFaceDeployControlTasksParams extends PagedParams {}
export class VehicleImageModelingParams extends ImageParams {}
export class GetVehicleRecordsByAttributeParams extends PagedDurationParams {
  /**	String[]	过滤抓拍摄像机ID	O */
  CameraIds?: string[];
  /**	String[]	卡口ID	O */
  CrossingIds?: string[];
  /**
   *	String	排序字段
   *  CaptureTime：按抓拍时间排序	O
   */
  Sort?: 'CaptureTime';
  /**	String	排序(desc-降序，asc-升序)	O */
  Order?: OrderType;
  /**	String	排除车牌号码	O */
  ExcludePlateNo?: string;
  /**	Boolean	临时牌照	O */
  TempPlateNo?: boolean;
  /**	String	车牌号（必须为精确车牌号）	O */
  PlateNo?: string;
  /**	String	车牌颜色，参见：2.3.12.2	O */
  @Transform(transformParams)
  PlateColor?: string;
  /**	String	车牌类型，参见：2.3.12.2	O */
  @Transform(transformParams)
  PlateType?: string;
  /**	String	车牌状态，参见：2.3.12.2	O */
  @Transform(transformParams)
  PlateState?: string;
  /**	String	车辆类型，参见：2.3.12.2	O */
  @Transform(transformParams)
  VehicleType?: string;
  /**	String	车辆颜色，参见：2.3.12.2	O */
  @Transform(transformParams)
  VehicleColor?: string;
  /**	String	车辆颜色深浅，参见：2.3.12.2	O */
  @Transform(transformParams)
  VehicleColorDepth?: string;
  /**	String		车速，是一个范围值，例如40到80km/h，传入 40,80	O */
  VehicleSpeed?: string;
  /**	String	车辆品牌	O */
  VehicleLogo?: string;
  /**	String	车辆子品牌	O */
  VehicleSubLogo?: string;
  /**	String	车辆年款	O */
  VehicleModel?: string;
  /**	String[]	过车ID	O */
  PassingIds?: string[];
  /**	String	方向	O */
  Direction?: string;
  /**	String	车道号	O */
  LaneNo?: string;
  /**	Boolean	天窗站人	O */
  Pdvs?: boolean;
  /**	Boolean	是否打手机	O */
  UsePhone?: boolean;
  /**	Boolean	驾驶安全带	O */
  PilotSafebelt?: boolean;
  /**	Boolean	副驾驶位	O */
  Copilot?: boolean;
  /**	Boolean	黄标车	O */
  EnvproSign?: boolean;
  /**	String	危险品	O */
  DangMark?: string;
  /**	Boolean	挂件	O */
  Pendant?: boolean;
  /**	Boolean	贴标签	O */
  Label?: boolean;
  /**	Boolean	纸巾盒	O */
  TissueBox?: boolean;
  /**	Boolean	摆件	O */
  Decoration?: boolean;
  /**	Boolean	备胎	O */
  SpareTire?: boolean;
  /**	Boolean	前排儿童	O */
  FrontChild?: boolean;
  /**	Boolean	前排儿童	O */
  LuggageRackx?: boolean;
  /**	Boolean	车身喷字	O */
  SprayPainted?: boolean;
  /**	Boolean	卡片	O */
  Card?: boolean;
  /**	Boolean	天窗	O */
  Sunroof?: boolean;
  /**	Boolean	渣土车	O */
  MuckTruck?: boolean;
  /**	Boolean	渣土车	O */
  CoverPlatex?: boolean;
  /**	String	前景图片正背向	O */
  VehicleHead?: string;
  /**	String	人车关联ID	O */
  LinkFaceId?: string;
  /**	String	车和Wifi关联Id	O */
  LinkWiFiId?: string;
}
export class CreateVehicleDeployControlParams extends DurationParams {
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
export class GetVehicleDeployControlTasksParams extends PagedParams {}
export class BodyImageModelingParams extends ImageParams {}
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
