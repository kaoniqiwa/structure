import { SingleResultType } from 'src/app/enums/single-result-type.enum';
import { IModel } from './model.interface';

/** SingleResult (单个操作结果)	*/
export class SingleResult implements IModel {
  /**	String	资源ID	M	*/
  ResourceId!: string;
  /**	Int32	结果：0-成功，1-失败	M	*/
  Result!: SingleResultType;
  /**	String	描述信息	O	*/
  ResultDescription?: string;
}
