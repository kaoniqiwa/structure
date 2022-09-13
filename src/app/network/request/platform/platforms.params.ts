import { PlatformProtocolType } from 'src/app/enums/platform-protocol-type.enum';
import { PagedParams } from '../../IParams.interface';

/**获取平台信息请求参数 */
export class GetPlatformsParams extends PagedParams {
  /**平台ID列表(可选) */
  PlatformIds?: string[];
  /**平台名称，支持LIKE(可选) */
  Name?: string;
  /**协议类型(可选) */
  ProtocolType?: PlatformProtocolType;
  /**状态(可选) */
  State?: number;
}
