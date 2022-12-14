import { IModel } from './model.interface';

/** Page (分页信息)	*/
export class Page implements IModel {
  /**	Int32	页码 1.2.3 …..	M	*/
  PageIndex: number = 1;
  /**	Int32	分页大小	M	*/
  PageSize: number = 10;
  /**	Int32	总页数	M	*/
  PageCount: number = 0;
  /**	Int32	当前页的记录数目	M	*/
  RecordCount: number = 0;
  /**	Int32	总记录数目	M	*/
  TotalRecordCount: number = 0;
}
/** PagedList<T> (分页数据)	*/
export class PagedList<T> implements IModel {
  /**	Page	分页信息	M	*/
  Page!: Page;
  /**	T[]	数据内容，T为任何需要的类型	M	*/
  Data!: T[];
}
