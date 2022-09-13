import { IModel } from './model.interface';

/** AILabel (AI模型标签) */
export class AILabel implements IModel {
  /**	Int32	标签ID	M	*/
  LabelId!: number;
  /**	String	标签名称	M	*/
  LabelName!: string;
  /**	AILabel[]	二级标签	O	*/
  Labels?: AILabel[];
}
