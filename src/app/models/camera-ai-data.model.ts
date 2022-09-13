import { Transform } from 'class-transformer';
import { IModel } from './model.interface';
import { Resolution } from './resolution';
import { transformDateTime } from './transform.model';
import { CameraAIDataObject } from './camera-ai-data-object.model';

/** CameraAIData (AI摄像机数据)	*/
export class CameraAIData implements IModel {
  /**	CameraAIDataObject[]	识别成功的目标列表	M	*/
  Objects!: CameraAIDataObject[];

  /**	Resolution	图片分辨率	O	*/
  Resolution?: Resolution;
  /**	String	图片ID、图片地址	O	*/
  ImageUrl?: string;
  /**	DateTime	数据上报时间	M	*/
  @Transform(transformDateTime)
  Time!: Date;
  /**	String	模型数据ID	O	*/
  ModelId?: string;
  /**	String	模型名称	O	*/
  ModelName?: string;
}
