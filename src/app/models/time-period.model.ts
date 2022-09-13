import { Transform } from 'class-transformer';
import { IModel } from './model.interface';
import { transformTime } from './transform.model';

/** TimePeriod(时间段)	 00:00:00-24:00:00							*/
export class TimePeriod implements IModel {
  /**	Time	开始时间 HH:mm:ss	M	*/
  @Transform(transformTime)
  BeginTime!: Date;
  /**	Time	结束时间 HH:mm:ss	M	*/
  @Transform(transformTime)
  EndTime!: Date;
}
