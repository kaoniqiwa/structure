import { Transform } from 'class-transformer';
import { CameraState } from 'src/app/enums/flags/camera-state.flags';
import { CameraType } from 'src/app/enums/camera-type.enum';
import { CameraUsage } from 'src/app/enums/camera-usage.enum';
import { OnlineStatus } from 'src/app/enums/online-status.enum';
import { IModel } from '../model.interface';
import { transformDateTime } from '../transform.model';
import { CameraAIModel } from '../camera-ai-model.model';
import { Resource } from './resource.model';

/** Camera (监控点扩展信息)	*/
export class Camera extends Resource implements IModel {
  /**	Int32	摄像机类型	M	*/
  CameraType!: CameraType;
  /**	Int32	摄像机状态	M	*/
  CameraState!: CameraState;
  /**	Int32	对应设备的通道编号1-n	M	*/
  ChannelNo!: number;
  /**	String	编码设备ID	M	*/
  EncodeDeviceId!: string;
  /**	Int32	在线状态：0-正常,1-离线	O	*/
  OnlineStatus?: OnlineStatus;
  /**	Int32	伪码，键盘码	O	*/
  KeyBoardCode?: number;
  /**	String	存储路径	O	*/
  StorageLocation?: string;
  /**	String	安装位置	O	*/
  InstallLocation?: string;
  /**	Boolean	是否PTZ可控	O	*/
  PTZControllable?: boolean;
  /**	Boolean	是否可存储的	O	*/
  Storable?: boolean;
  /**	Int32	最大支持的AI模型数量 如果没有该设置，表示不支持AI模型灌入	O	*/
  MaxAIModel?: number;

  /**	String	最近一次的抓图照片地址	O	*/
  ImageUrl?: string;
  /**	DateTime	最近一次的抓图时间	O	*/
  @Transform(transformDateTime)
  ImageTime?: Date;
  /**	CameraAIModel[]	AI模型列表	O	*/
  AIModels?: CameraAIModel[];
  /**	String	流媒体ID	O	*/
  SRSId?: string;
  /**	String	流媒体服务器ID	O	*/
  SRServerId?: string;
}
