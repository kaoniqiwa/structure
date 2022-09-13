import { IModel } from './model.interface';
import { SingleResult } from './single-result.model';

/** BatchResult (批量操作结果)	*/
export class BatchResult implements IModel {
  /**	SingleResult[]	操作结果	O	*/
  Results?: SingleResult[];
}
