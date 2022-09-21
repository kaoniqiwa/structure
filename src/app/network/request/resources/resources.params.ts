import { CameraUsage } from 'src/app/enums/camera-usage.enum';
import { OnlineStatus } from 'src/app/enums/online-status.enum';
import { ResourceCameraType } from 'src/app/enums/resource-camera-type.enum';
import { PagedParams } from '../../IParams.interface';

export class GetCamerasParams extends PagedParams {
  /**	String[]	摄像机ID	O */
  Ids?: string[];
  /**	String	摄像机名称，支持LIKE	O */
  Name?: string;

  /**	Int32	相机类型，1：人脸2：车辆卡口	O */
  CameraType?: ResourceCameraType;
  /**	String[]	所属集合ID	O */
  CollectionIds?: string[];
  /**	Int32	在线状态0-正常，1-离线	O */
  OnlineStatus?: OnlineStatus;
  /**	Int32	用途，默认：0	O */
  Usage?: CameraUsage;
}
