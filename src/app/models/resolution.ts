import { IModel } from './model.interface';

/** Resolution (分辨率)	*/
export class Resolution implements IModel {
  /**	Double	宽度，像素	M 	*/
  Width!: number;
  /**	Double	高度，像素	M 	*/
  Height!: number;
}
