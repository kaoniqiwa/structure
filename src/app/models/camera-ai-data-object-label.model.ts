import { CameraAILabelDataType } from 'src/app/enums/camera-ai-label-data-type.enum';
import { IModel } from './model.interface';

/** CameraAIDataObjectLabel (AI摄像机识别的目标标签)	*/
export class CameraAIDataObjectLabel implements IModel {
  /**	String	模型数据ID	O	*/
  ModelId?: string;
  /**	String	标签ID	M	*/
  LabelId!: string;
  /**	String	标签数值	O	*/
  LabelValue?: string;
  /**	String	模型标签值	O	*/
  LabelModelValue?: string;
  /**	String	标签名称	M	*/
  LabelName!: string;
  /**	Double	置信度：0-100	M	*/
  Confidence!: number;
  /**	String	标签值的单位，只有Int类型是有单位的	O	*/
  Unit?: string;
  /**	String	标签值类型：None，Int，String，Enum 	O	*/
  DataType?: CameraAILabelDataType;

  /**	String	数值	O	*/
  DataValue?: string;
  /**	String	模型数值	O	*/
  DataModelValue?: string;
  /**	String	数值描述	O	*/
  DataDescription?: string;
  /**	Boolean	是否为与页标签	O	*/
  IsLeaf?: boolean;
  /**	String	父标签ID	O	*/
  ParentLabelId?: string;
}
