import { ProtocolType } from '../enums/protocol-type.enum';
import { IModel } from './model.interface';

/** Protocol (协议信息)	*/
export class Protocol implements IModel {
  /**	String	协议名称	M	*/
  Name!: string;
  /**	String	协议类型	M	*/
  ProtocolType!: ProtocolType;
  /**	String	默认连接地址	M	*/
  Url!: string;
  /**	String	默认用户名	O	*/
  Username?: string;
  /**	String	默认密码	O	*/
  Password?: string;
  /**	String	服务名称	M	*/
  ServiceName!: string;
}
