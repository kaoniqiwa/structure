import { EventType } from 'src/app/enums/event-type.enum';
import { IntelligentType } from 'src/app/enums/intelligent-type.enum';
import { ResourceType } from 'src/app/enums/resource-type.enum';
import { PagedDurationParams } from '../../IParams.interface';

export class GetEventRecordsParams extends PagedDurationParams {
  /**	Int32[]	事件类型	O			 */
  EventTypes?: EventType[];
  /**	String[]	资源ID	O */
  ResourceIds?: string[];
  /**
   *	String[]	资源类型：
   *  Camera：监控点
   *  EncodeDevice：编码设备
   *  IoTSensor：物联网传感器	O
   */
  ResourceTypes?: ResourceType[];
  /**	String	资源名称，支持LIKE	O */
  ResourceName?: string;

  /**	Boolean	是否倒序时间排列	O */
  Desc?: boolean;
}

export class GetFaceEventRecordsParams extends GetEventRecordsParams {
  /**	Double	大于指定相似度，取值范围[0,1] 	O */
  Similarity?: number;
  /**	String	人脸库ID	O */
  PersonLibId?: string;
  /**	String	名单库名称，支持LIKE	O */
  PersonLibName?: string;
  /**	String	人员名单唯一ID	O */
  PersonId?: string;
  /**	String	人员姓名，支持LIKE	O */
  PersonName?: string;
  /**	Int32	证件类型：common.human_certificate_type	O */
  CertificateType?: string;
  /**	String	证件号码	O */
  CertificateNumber?: string;
  /**	String	性别：common.human_gender	O */
  RegisterGender?: string;
}
export class GetVehicleEventRecordsParams extends GetEventRecordsParams {
  /**	String	车牌号码	M */
  PlateNo!: string;
  /**	String	车牌颜色:common.plate_color	O */
  PlateColor?: string;
  /**	String	车牌类型common.plate_type	 */
  PlateType?: string;
  /**	String	车身颜色:common.vehicle_color 	O */
  VehicleColor?: string;
  /**	String	车身颜色深浅common.vehicle_color_depth	O */
  VehicleColorDepth?: string;
  /**	String[]	卡口ID	O */
  CrossingIds?: string[];
  /**	String	卡口名称	O */
  CrossingName?: string;
}

export class GetMuckCarEventRecordsParams extends GetEventRecordsParams {
  /**	String	车牌号码	M */
  PlateNo!: string;
  /**	String	车牌颜色:common.plate_color	O */
  PlateColor?: string;
  /**	String	车身颜色:common.vehicle_color 	O */
  VehicleColor?: string;
  /**	Int32	AI识别原始违规类型;101-黑车,10-后盖异常	O */
  IntelligentType?: IntelligentType;
  /**	String[]	卡口ID	O */
  CrossingIds?: string[];
  /**	String	卡口名称	O */
  CrossingName?: string;
}
