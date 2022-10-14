import { Transform } from 'class-transformer';
import { OrderType } from 'src/app/enums/order-type.enum';
import { transformParams } from 'src/app/models/transform.model';
import { PagedDurationParams } from 'src/app/network/IParams.interface';

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
