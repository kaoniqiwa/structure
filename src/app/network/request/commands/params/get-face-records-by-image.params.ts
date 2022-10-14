import { OrderType } from 'src/app/enums/order-type.enum';
import { PagedDurationParams } from 'src/app/network/IParams.interface';

export class GetFaceRecordsByImageParams extends PagedDurationParams {
  /**	String[]	支持传多张图片二进制数据（当图片中无法检测出人脸目标，会提示错误。上传多个目标图片时，条件是“或”的关系。默认使用公司最优算法进行检测建模）	O */
  ImageDatas?: string[];
  /**	String[]	模型数据	O */
  ModelDatas?: string[];
  /**	String[]	过滤抓拍摄像机ID	O */
  CameraIds?: string[];
  /**	Double	模型对比最小阈值（取值范围: 0-1，精确到小数点后2位）	O */
  MinSimilarity?: number;
  /**	Int32	模型比对结果的最大数目(以脸搜脸查询期望返回结果的最大个数，默认为1000)	O */
  MaxResults?: number;
  /**
   *	String	排序字段
   *  Similarity：按相似度排序
   *  CaptureTime：按抓拍时间排序	O
   */
  Sort?: 'Similarity' | 'CaptureTime';
  /**	String	排序(desc-降序，asc-升序)	O */
  Order?: OrderType;
}
