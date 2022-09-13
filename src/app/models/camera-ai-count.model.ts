import { IModel } from './model.interface';

/** CameraAICount (AI摄像机计数)	*/
export class CameraAICount implements IModel {
  /**	String	规则ID	M	*/
  RuleId!: string;
  /**	Int32	目标数量	M	*/
  ObjectCount!: number;
}
