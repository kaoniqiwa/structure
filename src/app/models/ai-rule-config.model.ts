import { AITriggerType } from '../enums/enums';
import { AIEngine } from './ai-engine.model';
import { AIRuleRegion } from './ai-rule-region.model';
import { AITriggerCondition } from './ai-trigger-condition.model';
import { IModel } from './model.interface';

/** AIRuleConfig (AI规则配置) */
export class AIRuleConfig implements IModel {
  /**	Int32	唯一标识符	M	*/
  RuleId!: number;
  /**	String	规则名称	O	*/
  RuleName?: string;
  /**	Int32	规则类型	O	*/
  TriggerType?: AITriggerType;

  /**	AIEngine	AI引擎	M	*/
  Engine!: AIEngine;
  /**	AIRuleRegion[]	规则区域	O	*/
  Regions?: AIRuleRegion[];
  /**	AITriggerCondition	触发条件	O	*/
  TriggerCondition?: AITriggerCondition;
}
