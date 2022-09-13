import { IModel } from './model.interface';

/** MediumServer (媒体服务器信息)	*/
export class MediumServer implements IModel {
  /**	String	对外的IP地址	M	*/
  IPAddress!: string;
  /**	Int32	端口号	M	*/
  Port!: number;
  /**	Int32	最大存储天数	M	*/
  MaxStorageDay!: number;
}
