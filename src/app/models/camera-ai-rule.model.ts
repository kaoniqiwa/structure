import { IModel } from './model.interface';
import { Point } from './point.model';

/** CameraAIRule (AI摄像机事件触发规则)	*/
export class CameraAIRule implements IModel {
  /**	String	规则ID	M	*/
  RuleId!: string;
  /**	Int32	触发类型(保留)	O	*/
  TriggerType?: number;
  /**	Int32	方向(保留)	O	*/
  Direction?: number;
  /**	Point[]	规则的归一化多边形	O	*/
  Polygon?: Point[];
  /**	String[]	触发规则的对象ID，可以在CameraAIData的Objects中找到	O	*/
  ObjectIds?: string[];
}
