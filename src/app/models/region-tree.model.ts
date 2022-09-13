import { IModel } from './model.interface';
import { RegionNode } from './region-node.model';

/** RegionTree (区域树形结构)	*/
export class RegionTree implements IModel {
  /**	String	根名称，默认：根区域	M	*/
  Name!: string;
  /**	RegionNode[]	子区域节点	O	*/
  Nodes?: RegionNode[];
}
