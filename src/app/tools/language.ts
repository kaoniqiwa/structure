import { formatDate } from '@angular/common';
import { CameraType } from '../enums/camera-type.enum';
import { EventType } from '../enums/event-type.enum';
import { OnlineStatus } from '../enums/online-status.enum';
import { RegionNodeType } from '../enums/region-node-type.enum';
import { ResourceType } from '../enums/resource-type.enum';
import { VehicleReason } from '../enums/vehicle-reason.enum';

export class Language {
  static Week(day: number, format: string = '周') {
    let name = ['日', '一', '二', '三', '四', '五', '六', '日'];
    return `${format}${name[day]}`;
  }

  static DateTime(date: Date, format: string) {
    return formatDate(date, format, 'en');
  }

  static OnlineStatus(status?: OnlineStatus) {
    switch (status) {
      case OnlineStatus.online:
        return '在线';
      case OnlineStatus.offline:
        return '离线';
      case undefined:
        return '未知';
      default:
        return '';
    }
  }

  static EventType(type: EventType) {
    switch (type) {
      case EventType.Face:
        return '人脸布控';
      case EventType.Vehicle:
        return '车辆布控';
      case EventType.MuckCar:
        return '渣土车出现';

      default:
        return '';
    }
  }
  static YesOrNo(yes: Boolean) {
    return yes ? '是' : '否';
  }

  static VehicleReason(reason: VehicleReason) {
    switch (reason) {
      case VehicleReason.robbed:
        return '被盗车';
      case VehicleReason.stolen:
        return '被抢车';
      case VehicleReason.suspect:
        return '嫌疑车';
      default:
        return '';
    }
  }
  static ResourceType(type: ResourceType) {
    switch (type) {
      case ResourceType.Camera:
        return '监控点';
      case ResourceType.EncodeDevice:
        return '编码设备';
      case ResourceType.IoTSensor:
        return '物联网传感器';
      case ResourceType.Crossing:
        return '卡口';
      case ResourceType.ResourceCollection:
        return '资源集合';
      default:
        return '';
    }
  }
  static RegionNodeType(type?: RegionNodeType) {
    switch (type) {
      case RegionNodeType.camera:
        return '普通摄像机';
      case RegionNodeType.face:
        return '人脸、人体摄像机';
      case RegionNodeType.vehicle:
        return '车辆卡口摄像机';
      case undefined:
        return '未知';
      default:
        return '';
    }
  }

  static CameraType(type: CameraType) {
    switch (type) {
      case CameraType.Common:
        return '普通摄像机';
      case CameraType.Face:
        return '人脸摄像机';
      case CameraType.Vehicle:
        return '车辆卡口摄像机';
      default:
        return '';
    }
  }
}
