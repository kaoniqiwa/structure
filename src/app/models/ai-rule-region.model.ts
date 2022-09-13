import { CrossDirectionType } from '../enums/cross-direction-type.enum';
import { IModel } from './model.interface';
import { Point } from './point.model';

/** AIRuleRegion (AI规则区域) */
export class AIRuleRegion implements IModel {
  /**	Int32	区域ID	M	*/
  RegionId!: number;
  /**	Int32	指明区域的跨线方向, 不需要指定跨线方向为0, 如1为双向, 2为从左到右, 3从右到左, 当配置跨线检测事件类型时需要填写	O	*/
  CrossDirection?: CrossDirectionType;
  /**	Point[]	区域坐标列表	O	*/
  Polygon?: Point[];
}
