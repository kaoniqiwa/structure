import { DeviceType } from 'src/app/enums/device-type.enum';
import { OnlineStatus } from '../../enums/online-status.enum';
import { ProtocolType } from '../../enums/protocol-type.enum';
import { TransType } from '../../enums/trans-type.enum';
import { IModel } from '../model.interface';
import { Resource } from './resource.model';

/** EncodeDevice (编码设备扩展信息)	*/
export class EncodeDevice extends Resource implements IModel {
  /**	Int32	传输类型 0：UDP，1：TCP	O	*/
  TransType?: TransType;
  /**	String	协议类型：Howell，Hikvision，UniView，Dahua，…	O	*/
  ProtocolType?: ProtocolType;
  /**	Int32	状态：0-正常,1-离线	O	*/
  OnlineStatus?: OnlineStatus;
  /**	String	型号	O	*/
  Model?: string;
  /**	String	序列号	O	*/
  SerialNumber?: string;
  /**	String	厂商	O	*/
  Manufactory?: string;
  /**	String	连接地址http://ip:port/query	M	*/
  Url!: string;
  /**	String	用户名	O	*/
  Username?: string;
  /**	String	密码	O	*/
  Password?: string;
  /**	String[]	能力	O	*/
  CapabilitySet?: string[];
  /**	String[]	能力名称	O	*/
  CapabilitySetName?: string[];
  /**	String	固件版本号	O	*/
  FirmwareVersion?: string;
  /**	String	软件版本号	O	*/
  SoftwareVersion?: string;
  /**	String	硬件版本号	O	*/
  HardwareVersion?: string;
  /**	String	设备类型：NVR，IPC，DVS	O	*/
  DeviceType?: DeviceType;
  /**	String	流媒体ID	O	*/
  SRSId?: string;
  /**	String	流媒体服务器ID	O	*/
  SRServerId?: string;
}
