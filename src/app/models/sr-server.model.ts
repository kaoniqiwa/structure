import { SRServerProtocolType } from '../enums/sr-server-protocol-type.enum';
import { IModel } from './model.interface';
import { SRServerAddress } from './sr-server-address.model';

/** SRServer (流转服务器信息)	*/
export class SRServer implements IModel {
  /**	String	服务器ID	M	*/
  Id!: string;
  /**	String	服务器名称	M	*/
  Name!: string;
  /**	String	协议类型：Howell	M	*/
  ProtocolType!: SRServerProtocolType;
  /**	SRServerAddress[]	服务器地址列表	M	*/
  Addresses!: SRServerAddress[];
  /**	String	用户名	O	*/
  Username?: string;
  /**	String	密码	O	*/
  Password?: string;
}
