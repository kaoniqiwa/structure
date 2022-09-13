import { IModel } from '../model.interface';
import { EventRecord } from './event.record';

/** FaceEventData (人脸事件数据) */
export class FaceEventData implements IModel {
  /**	String	布控任务名称	O	*/
  TaskName?: string;
  /**	String	布控任务ID	O	*/
  TaskId?: string;
  /**	String	目标图片url	O	*/
  SnappedImageUrl?: string;
  /**	String	比对源图片url	O	*/
  RefrenceImageUrl?: string;
  /**	String	背景图片url	O	*/
  BackgroundImageUrl?: string;

  /**	Double	相似度，取值范围[0,1]	O	*/
  Similarity?: number;
  /**	String	人脸库ID	O	*/
  PersonLibId?: string;
  /**	String	名单库名称	O	*/
  PersonLibName?: string;
  /**	String	人员名单唯一ID	O	*/
  PersonId?: string;
  /**	String	人员姓名	O	*/
  PersonName?: string;
  /**	Int32	证件类型：common.human_certificate_type	O	*/
  CertificateType?: number;

  /**	String	证件类型名称	O	*/
  CertificateTypeName?: string;
  /**	String	证件号码	O	*/
  CertificateNumber?: string;
  /**	String	性别：common.human_gender	O	*/
  RegisterGender?: string;

  /**	String	性别名称	O	*/
  RegisterGenderName?: string;
}

/** FaceEventRecord (人脸布控事件)
 */
export class FaceEventRecord extends EventRecord implements IModel {
  /**	FaceEventData	人脸事件内容	M	*/
  Data!: FaceEventData;
}
