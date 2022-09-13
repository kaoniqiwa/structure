import { FilteringType } from '../enums/filtering-type.enum';
import { IModel } from './model.interface';
import { TimePeriod } from './time-period.model';

/** EventObjectFilter (模型事件目标过滤) */
export class EventObjectFilter implements IModel {
  /**	Boolean	是否启用	M	*/
  Enabled!: boolean;
  /**	Int32[]	事件编号数组	O	*/
  EventNos?: number[];
  /**	Double	重叠区域匹配百分比	O	*/
  MatchPercent?: number;
  /**	Int32	置信度最小值，0-1000	M	*/
  Confidence!: number;
  /**	Int32	过期时间，单位：分钟	O	*/
  ExpiredMinutes?: number;
  /**	TimePeriod[]	无效事件时间段	O	*/
  FilteringTime?: TimePeriod[];
  /**	Int32	需要过滤的模型标签数值	O	*/
  LabelValue?: number;
  /**	Int32	过滤类型，1-去重（默认）2-滞留	O	*/
  FilteringType?: FilteringType;

  /**	Int32	目标滞留报警时间，单位：秒	O	*/
  StaySeconds?: number;
  /**	Boolean	目标滞留报警后是否重置目标	O	*/
  StayResetable?: boolean;
  /**	Int32	最小过期时间，单位：秒	O	*/
  MinExpiredSeconds?: number;
  /**	Int32	过期时间步进，单位：秒	O	*/
  ExpiredStepSeconds?: number;
}
