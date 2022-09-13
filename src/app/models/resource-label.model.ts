import { IModel } from './model.interface';

/** ResourceLabel (资源标签)								
资源标签的主要用途是分类和标记资源对象，如：区域名称，类别，用途等。	*/
export class ResourceLabel implements IModel {
  /**	String	唯一标识符	M	*/
  Id!: string;
  /**	String	资源名称	M	*/
  Name!: string;
}
