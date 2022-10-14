import { Transform } from 'class-transformer';
import { DeployDetails } from 'src/app/models/deploy-details.model';
import {
  transformImageData,
  transformParams,
} from 'src/app/models/transform.model';
import { DurationParams } from 'src/app/network/IParams.interface';

export class SetFaceDeployControlParams extends DurationParams {
  /**	String	布控任务ID	M */
  TaskId!: string;
  /**	String	布控名称	M */
  TaskName!: string;
  /**	String[]	布控相机ID，最多传2000个	M */
  CameraIds!: string[];
  /**	String	图片base64数据	O */
  @Transform(transformImageData)
  ImageData?: string;
  /**	String	姓名	O */
  Name?: string;
  /**	String	性别，参见：2.3.12.1	O */
  @Transform(transformParams)
  Gender?: string;
  /**	Date	出生日期	O */
  BornTime?: Date;
  /**	Int32	证件类型，参见：2.3.12.1	O */
  @Transform(transformParams)
  CertificateType?: number;
  /**	String	证件号码	O */
  CertificateNumber?: string;
  /**	String	描述备注	O			 */
  Remark?: string;
  /**	DeployDetails[]	布控报警时间段和阈值	M */
  Details!: DeployDetails[];
}
