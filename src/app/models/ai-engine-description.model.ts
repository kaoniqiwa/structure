import { CameraAIDataType } from '../enums/camera-ai-data-type.enum';
import { AILabel } from './ai-label.model';
import { IModel } from './model.interface';

/** AIEngineDescription	 (AI引擎描述信息) */
export class AIEngineDescription implements IModel {
  /**	String	模型ID	M	*/
  ModelId!: string;
  /**	Int32	模型数据类型：1:检测数据，2:分类数据	O	*/
  ModelType?: CameraAIDataType;

  /**	AILabel[]	标签列表	O	*/
  Labels?: AILabel[];
}
