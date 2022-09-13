import { IModel } from './model.interface';
import { Point } from './point.model';
import { CameraAIDataObjectLabel } from './camera-ai-data-object-label.model';

/** CameraAIDataObject (AI摄像机识别的目标)	*/
export class CameraAIDataObject implements IModel {
  /**	String	目标ID	M	*/
  Id!: string;
  /**	Point[]	目标所在的归一化多边形	M	*/
  Polygon!: Point[];
  /**	Double	置信度：0-100	M	*/
  Confidence!: number;
  /**	Boolean	是否有效	O	*/
  Valid?: boolean;
  /**	Boolean	是否可见	O	*/
  Visible?: boolean;
  /**	String	目标图片	O	*/
  ObjectImageUrl?: string;
  /**	CameraAIDataObjectLabel[]	标签信息，包括所有子标签	O	*/
  Labels?: CameraAIDataObjectLabel[];
}
