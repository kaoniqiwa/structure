import { CameraAIData } from '../camera-ai-data.model';
import { CameraAIRule } from '../camera-ai-rule.model';
import { IModel } from '../model.interface';
import { EventRecord } from './event.record';

/** CameraAIEventRecord (摄像机AI事件)	*/
export class CameraAIEventRecord extends EventRecord implements IModel {
  /**	CameraAIData	AI事件内容	M	*/
  Data!: CameraAIData;
  /**	CameraAIRule[]	AI事件规则	O	*/
  Rules?: CameraAIRule[];
}
