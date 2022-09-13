import { IModel } from './model.interface';
import { TimePeriod } from './time-period.model';

/** DailySchedule (日工作表)	*/
export class DailySchedule implements IModel {
  /**	TimePeriod[]	时间段数组	O	*/
  TimePeriods?: TimePeriod[];
}
