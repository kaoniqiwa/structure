import { Transform } from 'class-transformer';
import { IModel } from './model.interface';
import { transformTime } from './transform.model';

/** DeployDetails (布控报警时间段和阈值) */
export class DeployDetails implements IModel {
  /**	Double	报警阈值设置（取值范围：0-1）	M	*/
  ThresholdMin!: number;
  /**	Time	报警时段开始时刻点（格式：HH:mm）	M	*/
  @Transform(transformTime)
  StartPeriod!: Date;
  /**	Time	报警时段开始时刻点（格式：HH:mm）	M	*/
  @Transform(transformTime)
  StopPeriod!: Date;
}
