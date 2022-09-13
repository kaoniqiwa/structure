import { IModel } from '../model.interface';
import { CameraAICount } from '../camera-ai-count.model';
import { CameraAIData } from '../camera-ai-data.model';
import { CameraAIRule } from '../camera-ai-rule.model';
import { EventRecord } from './event.record';

/** CameraAICountRecord (AI摄像机计数事件)	*/
export class CameraAICountRecord extends EventRecord implements IModel {
  /**	CameraAIData	AI事件内容	O	*/
  Data?: CameraAIData;
  /**	CameraAIRule[]	AI事件规则	O	*/
  Rules?: CameraAIRule[];
  /**	CameraAICount[]	AI计数事件内容	O	*/
  Counts?: CameraAICount[];
}
