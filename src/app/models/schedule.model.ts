import { Transform } from 'class-transformer';
import { IModel } from './model.interface';
import { transformDateTime } from './transform.model';
import { WeeklySchedule } from './weekly-schedule.model';

/** Schedule (工作表信息)	*/
export class Schedule implements IModel {
  /**	String	工作表ID	M	*/
  Id!: string;
  /**	String	工作表名称	M	*/
  Name!: string;
  /**	WeeklySchedule	周工作表时间信息	M	*/
  Time!: WeeklySchedule;
  /**	DateTime	创建时间	M	*/
  @Transform(transformDateTime)
  CreateTime!: Date;
  /**	DateTime	更新事件	M	*/
  @Transform(transformDateTime)
  UpdateTime!: Date;
}
