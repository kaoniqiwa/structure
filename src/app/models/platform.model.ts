import { Transform } from 'class-transformer';
import { PlatformProtocolType } from '../enums/platform-protocol-type.enum';
import { PlatformState } from '../enums/platform-state.enum';
import { IModel } from './model.interface';
import { transformDateTime } from './transform.model';

/** Platform (平台信息)	*/
export class Platform implements IModel {
  /**	String	平台ID	M/R	*/
  Id!: string;
  /**	String	平台名称	O	*/
  Name?: string;
  /**	String	用户名，AccessID	O	*/
  Username?: string;
  /**	String	密码，AccessKEY	O	*/
  Password?: string;
  /**	String	协议类型：Artemis	M	*/
  ProtocolType!: PlatformProtocolType;

  /**	String	连接地址http://ip:port/query	M	*/
  Url!: string;
  /**	String	软件版本	O	*/
  SoftwareVersion?: string;
  /**	Int32	状态：0-正常，1-故障	M	*/
  State!: PlatformState;
  /**	DateTime	创建时间	M /R	*/
  @Transform(transformDateTime)
  CreateTime!: Date;
  /**	DateTime	更新时间	M /R	*/
  @Transform(transformDateTime)
  UpdateTime!: Date;
  /**	Int32	事件接收端口号	O	*/
  EventRecvPort?: number;
  /**	String	事件接收的本地IP地址	O	*/
  EventRecvIPAddress?: string;
  /**	Int32[]	订阅事件编码列表	O	*/
  EventCodes?: number[];
  /**	Int32	ActiveMQ端口号	O	*/
  MQPort?: number;
  /**	String	ActiveMQ 用户名	O	*/
  MQUsername?: string;
  /**	String	ActiveMQ 密码	O	*/
  MQPassword?: string;
  /**	String[]	ActiveMQ主题	O	*/
  MQTopics?: string[];
  /**	Int32[]	ActiveMQ消息编码列表	O	*/
  MQEventCodes?: number[];
}
