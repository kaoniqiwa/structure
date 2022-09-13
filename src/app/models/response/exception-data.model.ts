import { IModel } from '../model.interface';

export class ExceptionData implements IModel {
  /**	String	异常消息	M	*/
  Message!: string;
  /**	String	异常类型	M	*/
  ExceptionType!: string;
  /**	ExceptionData	内部异常	O	*/
  InnerException?: ExceptionData;
}
