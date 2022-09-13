import { IModel } from './model.interface';

/** Point (归一化坐标点)	*/
export class Point implements IModel {
  /**	Double	水平坐标[0,1]	M 	*/
  X!: number;
  /**	Double	垂直坐标[0,1]	M 	*/
  Y!: number;
}
