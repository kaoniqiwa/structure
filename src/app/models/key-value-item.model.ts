import { Transform } from 'class-transformer';
import { IModel } from './model.interface';
import { transformKeyValue } from './transform.model';

/** KeyValueItem (键值对数据) */
export class KeyValueItem<TKey = any, TValue = any> implements IModel {
  /**	Int32	键	M	*/
  Key!: TKey;
  /**	String	数值	M	*/
  @Transform(transformKeyValue)
  Value!: TValue;
  /**	String	名称	O	*/
  Name?: string;
}
