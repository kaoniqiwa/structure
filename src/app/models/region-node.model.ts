import { IModel } from './model.interface';

/** RegionNode (区域节点)	*/
export class RegionNode implements IModel {
  /**	String	区域ID	M	*/
  Id!: string;
  /**	String	区域名称	M	*/
  Name!: string;
  /**	Int32	区域类型，用于图标区分	M	*/
  RegionType!: number;
  /**	String	描述信息	O	*/
  Description?: string;
  /**	RegionNode[]	子区域节点	O	*/
  Nodes?: RegionNode[];
}
