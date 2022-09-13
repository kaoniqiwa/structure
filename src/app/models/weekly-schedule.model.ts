import { DailySchedule } from './daily-schedule.model';
import { IModel } from './model.interface';

/** WeeklySchedule (周工作表) */
export class WeeklySchedule implements IModel {
  /**	DailySchedule[]	周日-周六的每日工作表，数组下标0-周日，1-周一，6-周六。	M	*/
  Days!: DailySchedule[];
}
