import { AIEngineDescription } from './ai-engine-description.model';
import { IModel } from './model.interface';

/** AIEngine (AI引擎) */
export class AIEngine implements IModel {
  /**	Int32	引擎唯一标识符	M	*/
  EngineId!: number;
  /**	String	引擎名称	O	*/
  EngineName?: string;
  /**	AIEngineDescription[]	AI引擎描述信息	O	*/
  EngineDescriptions?: AIEngineDescription[];
}
