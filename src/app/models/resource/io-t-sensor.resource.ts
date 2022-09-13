import { SensorType, SensorState } from 'src/app/enums/enums';
import { OnlineStatus } from 'src/app/enums/online-status.enum';
import { SensorNodeType } from 'src/app/enums/sensor-node-type.enum';
import { IModel } from '../model.interface';
import { Resource } from './resource.model';

/** IoTSensor (物联网传感器扩展信息)	*/
export class IoTSensor extends Resource implements IModel {
  /**	Int32	传感器类型	M	*/
  SensorType!: SensorType;
  /**	Int32	传感器状态	M	*/
  SensorState!: SensorState;
  /**	Object	传感器数据传输对象	O	*/
  SensorData?: any;
  /**	Object	传感器数据传输对象的格式	O	*/
  SensorDTO?: any;
  /**	Int32	在线状态	O	*/
  OnlineStatus?: OnlineStatus;
  /**	String	厂商	O	*/
  Manufactory?: string;
  /**	String	型号	O	*/
  Model?: string;
  /**	String	NB-IoT终端的IMSI	O	*/
  IMSI?: string;
  /**	String	固件版本号	O	*/
  FirmwareVersion?: string;
  /**	String	软件版本号	O	*/
  SoftwareVersion?: string;
  /**	String	硬件版本号	O	*/
  HardwareVersion?: string;
  /**	String	设备类型：	O	*/
  DeviceType?: string;
  /**	Int32	节点类型：0：UNKNOW，1：ENDPOINT，2：GATEWAY	O	*/
  NodeType?: SensorNodeType;

  /**	String	Radius地址。	O	*/
  RadiusIP?: string;
  /**	String	Bridge标识，表示设备通过哪个Bridge接入物联网平台。	O	*/
  BridgeId?: string;
}
