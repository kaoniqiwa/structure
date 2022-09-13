import { Transform } from 'class-transformer';
import { IModel } from './model.interface';
import { transformDateTime } from './transform.model';

/** Message<T> (消息通知数据结构)	*/
export class Message<T> implements IModel {
  /**	String	消息ID	M	*/
  Id!: string;
  /**	DateTime	触发时间	M	*/
  @Transform(transformDateTime)
  Time!: Date;
  /**	Int32	消息类型	M	*/
  MessageType!: number;
  /**	T	内容数据结构	O	*/
  Data?: T;
}
