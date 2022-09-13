import { IModel } from './model.interface';

/** KeyValueItem (键值对数据) */
export class KeyValueItem<TKey = number, TValue = string> implements IModel {
  /**	Int32	键	M	*/
  Key!: TKey;
  /**	String	数值	M	*/
  Value!: TValue;
  /**	String	名称	O	*/
  Name?: string;
}
