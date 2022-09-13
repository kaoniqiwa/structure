import { IModel } from './model.interface';

/** PlatformAssociation (平台关联信息)	*/
export class PlatformAssociation implements IModel {
  /**	String	所属平台ID	M	*/
  PlatformId!: string;
  /**	String	平台关联ID	M	*/
  PlatformAccessId!: string;
  /**	String	平台关联名称	O	*/
  PlatformAccessName?: string;
}
