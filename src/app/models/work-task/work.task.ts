import { Transform } from 'class-transformer';
import { IModel } from '../model.interface';
import { ResourceThumbnail } from '../resource-thumbnail.model';
import { transformDateTime } from '../transform.model';

/** WorkTask (工作任务)	*/
export class WorkTask implements IModel {
  /**	String	任务ID	M	*/
  Id!: string;
  /**	String	任务名称	M	*/
  Name!: string;
  /**	String	任务类型	M	*/
  TaskType!: string;
  /**	String	工作表ID	M	*/
  ScheduleId!: string;
  /**	String	工作表名称	M	*/
  ScheduleName!: string;
  /**	ResourceThumbnail[]	任务关联的资源列表	O	*/
  Resources?: ResourceThumbnail[];
  /**	DateTime	创建时间	M	*/
  @Transform(transformDateTime)
  CreateTime!: Date;
  /**	DateTime	更新事件	M	*/
  @Transform(transformDateTime)
  UpdateTime!: Date;
}
