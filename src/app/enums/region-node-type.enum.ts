/**
 * NodeType	Int32	节点类型，用于图标区分，
 * 1：人脸、人体相机，2：车辆卡口相机。	O
 */
export enum RegionNodeType {
  /** 普通摄像机 */
  camera = 0,
  /** 1：人脸、人体相机 */
  face = 1,
  /** 2：车辆卡口相机 */
  vehicle = 2,
}
