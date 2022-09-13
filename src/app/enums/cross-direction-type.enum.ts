/**	Int32	指明区域的跨线方向, 不需要指定跨线方向为0, 如1为双向, 2为从左到右, 3从右到左, 当配置跨线检测事件类型时需要填写	*/
export enum CrossDirectionType {
  none = 0,
  two_way = 1,
  left_right = 2,
  right_left = 3,
}
