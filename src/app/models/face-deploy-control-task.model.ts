import { Transform } from 'class-transformer';
import { DeployDetails } from './deploy-details.model';
import { IModel } from './model.interface';
import {
  transformDateTime,
  transformDate,
  transformImageData,
} from './transform.model';

/** FaceDeployControlTask (人脸布控任务) */
export class FaceDeployControlTask implements IModel {
  /**	String	任务ID	M	*/
  TaskId!: string;
  /**	String	布控名称	M	*/
  TaskName!: string;
  /**	String[]	布控相机ID，最多传2000个	M	*/
  CameraIds!: string[];
  /**	DateTime	开始时间（有效期）	M	*/
  @Transform(transformDateTime)
  BeginTime!: Date;
  /**	DateTime	结束时间（有效期）	M	*/
  @Transform(transformDateTime)
  EndTime!: Date;
  /**	String	图片base64数据	O	*/
  @Transform(transformImageData)
  ImageData?: string;
  /**	String	姓名	O	*/
  Name?: string;
  /**	String	性别，参见：2.3.12.1	O	*/
  Gender?: string;
  /**	Date	出生日期	O	*/
  @Transform(transformDate)
  BornTime?: Date;
  /**	Int32	证件类型，参见：2.3.12.1	O	*/
  CertificateType?: number;
  /**	String	证件号码	O	*/
  CertificateNumber?: string;
  /**	String	描述备注	O	*/
  Remark?: string;
  /**	String	是否微笑，参见：2.3.12.1	O	*/
  Smile?: string;
  /**	DeployDetails[]	布控报警时间段和阈值	M	*/
  Details!: DeployDetails[];
  /**	String	布控名单库ID（多个以英文逗号隔开，最多100个）。	O	*/
  PersonlibIds?: string;
}
