import { IModel } from './model.interface';

/** Rectangle (矩形) */
export class Rectangle implements IModel {
  /**	Double	X	M	*/
  X!: number;
  /**	Double	Y	M	*/
  Y!: number;
  /**	Double	宽	M	*/
  Width!: number;
  /**	Double	高	M	*/
  Height!: number;
}
