import { IModel } from '../model.interface';
import { ExceptionData } from './exception-data.model';

/** Response<T>(应答信息)	*/
export class HowellResponse<T> implements IModel {
  /**	Int32	错误码间附录3.3	M	*/
  FaultCode!: number;
  /**	String	错误原因	M	*/
  FaultReason!: string;
  /**	ExceptionData	内部异常	O	*/
  InnerException?: ExceptionData;
  /**	T	应答实体数据	O	*/
  Data?: T;
}

export interface HttpResponse<T> {
  data: HowellResponse<T>;
  status: number;
  statusText: string;
}

export class Fault {
  FaultCode!: number;
  FaultReason!: string;
  Exception?: ExceptionData;
  Id?: string;
}
