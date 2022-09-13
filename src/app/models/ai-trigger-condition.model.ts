import { SwitchStatus } from '../enums/switch-status.enum';
import { IModel } from './model.interface';

/** AITriggerCondition (AI触发条件) */
export class AITriggerCondition implements IModel {
  /**	Int32	是否有效，0-OFF，1-ON	M	*/
  TriggerConditionValid!: SwitchStatus;
  /**	Int32	目标类型，对应引擎里的标签ID	O	*/
  TargetType?: number;
}
