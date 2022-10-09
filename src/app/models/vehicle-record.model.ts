import { Transform } from 'class-transformer';
import { IModel } from './model.interface';
import { transformDateTime, transformRecordName } from './transform.model';

/** VehicleRecord (车辆记录) */
export class VehicleRecord implements IModel {
  /**	String	记录ID	M	*/
  Id!: string;
  /**	Double	经度	O	*/
  Longitude?: number;
  /**	Double	纬度	O	*/
  Latitude?: number;
  /**	DateTime	抓拍时间	O	*/
  @Transform(transformDateTime)
  CaptureTime?: Date;
  /**	String	车牌照片	O	*/
  PlatePictureUrl?: string;
  /**	String	背景图片url	O	*/
  BackgroundUrl?: string;
  /**	String	过车ID	O	*/
  PassingId?: string;
  /**	String	摄像机ID	O	*/
  CameraId?: string;
  /**	String	摄像机名称	O	*/
  @Transform(transformRecordName)
  CameraName?: string;
  /**	String	卡口ID	O	*/
  CrossingId?: string;
  /**	String	卡口名称	O	*/
  @Transform(transformRecordName)
  CrossingName?: string;
  /**	String	车牌号码	O	*/
  PlateNo?: string;
  /**	String	车牌颜色，参见：2.3.12.2	O	*/
  PlateColor?: string;
  /**	String	车牌颜色说明	O	*/
  @Transform(transformRecordName)
  PlateColorName?: string;
  /**	String	车牌类型，参见：2.3.12.2	O	*/
  PlateType?: string;
  /**	String	车牌类型说明	O	*/
  @Transform(transformRecordName)
  PlateTypeName?: string;
  /**	String	车牌尾号	O	*/
  PlateTail?: string;
  /**	String	归属地：浙A	O	*/
  PlateBelong?: string;
  /**	String	车牌省份：浙	O	*/
  PlateProvince?: string;
  /**	String	车牌状态，参见：2.3.12.2	O	*/
  PlateState?: string;
  /**	String	车牌状态说明	O	*/
  @Transform(transformRecordName)
  PlateStateName?: string;

  /**	Boolean	是否临时车牌	O	*/
  TempPlateNo?: boolean;
  /**	String	是否临时车牌说明	O	*/
  @Transform(transformRecordName)
  TempPlateNoName?: string;
  /**	String	车身颜色，参见：2.3.12.2	O	*/
  VehicleColor?: string;
  /**	String	车身颜色说明	O	*/
  @Transform(transformRecordName)
  VehicleColorName?: string;
  /**	String	车身颜色深浅，参见：2.3.12.2	O	*/
  VehicleColorDepth?: string;
  /**	String	车身颜色深浅说明	O	*/
  @Transform(transformRecordName)
  VehicleColorDepthName?: string;
  /**	String	车辆类型，参见：2.3.12.2	O	*/
  VehicleType?: string;
  /**	String	车辆类型说明	O	*/
  @Transform(transformRecordName)
  VehicleTypeName?: string;
  /**	String	车辆主品牌，参见：2.3.12.2	O	*/
  VehicleLogo?: string;
  /**	String	车辆主品牌说明	O	*/
  @Transform(transformRecordName)
  VehicleLogoName?: string;
  /**	String	车辆子品牌，参见：2.3.12.2	O	*/
  VehicleSubLogo?: string;
  /**	String	车辆子品牌说明	O	*/
  @Transform(transformRecordName)
  VehicleSubLogoName?: string;
  /**	String	车辆年款	O	*/
  VehicleModel?: string;
  /**	String	车辆年款说明	O	*/
  @Transform(transformRecordName)
  VehicleModelName?: string;
  /**	Double	车速：km/h	O	*/
  VehicleSpeed?: number;
  /**	Boolean	副驾驶是否有人	O	*/
  Copilot?: boolean;
  /**	String	副驾驶是否有人说明	O	*/
  @Transform(transformRecordName)
  CopilotName?: string;
  /**	Boolean	主驾驶员是否系安全带	O	*/
  PilotSafebelt?: boolean;
  /**	String	主驾驶员是否系安全带说明	O	*/
  @Transform(transformRecordName)
  PilotSafebeltName?: string;
  /**	Boolean	主驾驶遮阳板是否打开	O	*/
  PilotSunvisor?: boolean;
  /**	String	主驾驶遮阳板是否打开说明	O	*/
  @Transform(transformRecordName)
  PilotSunvisorName?: string;
  /**	Boolean	副驾驶员是否系安全带	O	*/
  VicePilotSafebelt?: boolean;
  /**	String	副驾驶员是否系安全带说明	O	*/
  @Transform(transformRecordName)
  VicePilotSafebeltName?: string;
  /**	Boolean	副驾驶遮阳板是否打开	O	*/
  VicePilotSunvisor?: boolean;
  /**	String	副驾驶遮阳板是否打开说明	O	*/
  @Transform(transformRecordName)
  VicePilotSunvisorName?: string;
  /**	Boolean	打电话状态	O	*/
  UsePhone?: boolean;
  /**	String	打电话状态说明	O	*/
  @Transform(transformRecordName)
  UsePhoneName?: string;
  /**	Boolean	副驾驶是否怀抱婴儿/儿童单独乘坐副驾	O	*/
  FrontChild?: boolean;
  /**	String	副驾驶是否怀抱婴儿/儿童单独乘坐副驾说明	O	*/
  @Transform(transformRecordName)
  FrontChildName?: string;
  /**	Boolean	天窗是否站人	O	*/
  Pdvs?: boolean;
  /**	String	天窗是否站人说明	O	*/
  @Transform(transformRecordName)
  PdvsName?: string;
  /**	Boolean	是否渣土车	O	*/
  MuckTruck?: boolean;
  /**	String	是否渣土车说明	O	*/
  @Transform(transformRecordName)
  MuckTruckName?: string;
  /**	Boolean	是否有天窗	O	*/
  Sunroof?: boolean;
  /**	String	是否有天窗说明	O	*/
  @Transform(transformRecordName)
  SunroofName?: string;
  /**	String	车牌识别方向	O	*/
  VehicleHead?: string;
  /**	String	车牌识别方向说明	O	*/
  @Transform(transformRecordName)
  VehicleHeadName?: string;
  /**	Boolean	是否有行李架	O	*/
  LuggageRack?: boolean;
  /**	String	是否有行李架说明	O	*/
  @Transform(transformRecordName)
  LuggageRackName?: string;
  /**	Boolean	是否车身喷字	O	*/
  SprayPainted?: boolean;
  /**	String	是否车身喷字说明	O	*/
  @Transform(transformRecordName)
  SprayPaintedName?: string;
  /**	Boolean	是否有备胎	O	*/
  SpareTire?: boolean;
  /**	String	是否有备胎说明	O	*/
  @Transform(transformRecordName)
  SpareTireName?: string;
  /**	Boolean	渣土车是否盖板	O	*/
  CoverPlate?: boolean;
  /**	String	渣土车是否盖板说明	O	*/
  @Transform(transformRecordName)
  CoverPlateName?: string;
  /**	Boolean	是否有贴标	O	*/
  Label?: boolean;
  /**	String	是否有贴标说明	O	*/
  @Transform(transformRecordName)
  LabelName?: string;
  /**	Boolean	是否有卡片	O	*/
  Card?: boolean;
  /**	String	是否有卡片说明	O	*/
  @Transform(transformRecordName)
  CardName?: string;
  /**	String	三轮车是否有蓬	O	*/
  TricycleCanopy?: string;
  /**	String	三轮车是否有蓬说明	O	*/
  @Transform(transformRecordName)
  TricycleCanopyName?: string;
  /**	Boolean	是否摆件	O	*/
  Decoration?: boolean;
  /**	String	是否摆件说明	O	*/
  @Transform(transformRecordName)
  DecorationName?: string;
  /**	Boolean	是否有纸巾盒	O	*/
  TissueBox?: boolean;
  /**	String	是否有纸巾盒说明	O	*/
  @Transform(transformRecordName)
  TissueBoxName?: string;
  /**	Boolean	挂件状态	O	*/
  Pendant?: boolean;

  /**	String	挂件状态说明	O	*/
  @Transform(transformRecordName)
  PendantName?: string;

  /**	String	危险品状态，参见：2.3.12.2	O	*/
  DangMark?: string;
  /**	String	危险品状态名称	O	*/
  @Transform(transformRecordName)
  DangMarkName?: string;
  /**	Boolean	是否黄标车	O	*/
  Envprosign?: boolean;
  /**	String	是否黄标车说明	O	*/
  @Transform(transformRecordName)
  EnvprosignName?: string;
  /**	String	方向：common.vehicle_direction	O	*/
  Direction?: string;

  /**	String	方向名称	O	*/
  @Transform(transformRecordName)
  DirectionName?: string;
}
