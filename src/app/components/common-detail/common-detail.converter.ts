import { Injectable } from '@angular/core';
import { IModel } from 'src/app/models/model.interface';
import {
  IConverter,
  IPromiseConverter,
} from '../../interfaces/converter.interface';
import { EventRecord } from '../../models/event-record/event.record';
import { FaceEventRecord } from '../../models/event-record/face-event.record';
import { Language } from '../../tools/language';
import { Medium } from '../../tools/medium';
import { CommonDetailModel } from './common-detail.model';
import { LinePerRecord } from 'src/app/enums/line-per-record.enum';
import { formatDate } from '@angular/common';
import { VehicleEventRecord } from 'src/app/models/event-record/vehicle-event.record';
import { BodyRecord } from 'src/app/models/body-record.model';
import { FaceRecord } from 'src/app/models/face-record.model';
import { MuckCarEventRecord } from 'src/app/models/event-record/muck-car-event.record';
import { VehicleRecord } from 'src/app/models/vehicle-record.model';
import { VehicleDeployControlTask } from 'src/app/models/vehicle-deploy-control-task.model';
import { FaceDeployControlTask } from 'src/app/models/face-deploy-control-task.model';

@Injectable({
  providedIn: 'root',
})
export class CommonDetailConverter {
  Convert(source: IModel, ...res: any[]): CommonDetailModel {
    if (source instanceof FaceEventRecord) {
      return this._fromFaceEventRecord(source);
    } else if (source instanceof VehicleEventRecord) {
      return this._fromVehicleEventRecord(source);
    } else if (source instanceof MuckCarEventRecord) {
      return this._fromMuckCarEventRecord(source);
    } else if (source instanceof BodyRecord) {
      return this._fromBodyRecord(source);
    } else if (source instanceof FaceRecord) {
      return this._fromFaceRecord(source);
    } else if (source instanceof VehicleRecord) {
      return this._fromVehicleRecord(source);
    } else if (source instanceof FaceDeployControlTask) {
      return this._fromFaceTask(source);
    } else if (source instanceof VehicleDeployControlTask) {
      return this._fromVehicleTask(source);
    }
    throw new Error('Error');
  }
  private _fromFaceEventRecord(item: FaceEventRecord) {
    let model = new CommonDetailModel();
    model.Title = '人脸布控报警';
    model.ContainerWidth = 655;
    model.ContainerHeight = 470;
    model.LeftWidth = 180;
    model.LinePerRecord = LinePerRecord.One;
    // model.ImageUrl = 'assets/img/sample-face.png';
    // model.BackgroundImageUrl = 'assets/img/sample-face.png';

    model.ImageUrl = Medium.img(item.ImageUrl);
    model.BackgroundImageUrl = Medium.img(item.Data.BackgroundImageUrl);
    model.Records = [
      {
        Icon: 'howell-icon-alarm3',
        PropertyDes: '报警名称',
        PropertyValue: item.Data.TaskName ?? '未知',
      },

      {
        Icon: 'howell-icon-sex',
        PropertyDes: '性别',
        PropertyValue: item.Data.RegisterGenderName ?? '未知',
      },
      {
        Icon: 'howell-icon-Face',
        PropertyDes: '人员姓名',
        PropertyValue: item.Data.PersonName ?? '未知',
      },
      {
        Icon: 'howell-icon-idcard',
        PropertyDes: '证件号码',
        PropertyValue: item.Data.CertificateNumber ?? '未知',
      },
      {
        Icon: 'howell-icon-video',
        PropertyDes: '抓拍相机',
        PropertyValue: item.ResourceName ?? '未知',
      },
      {
        Icon: 'howell-icon-time',
        PropertyDes: '抓拍时间',
        PropertyValue:
          formatDate(item.EventTime, 'yyyy-MM-dd HH:mm:ss', 'en') ?? '未知',
      },
    ];

    return model;
  }

  private _fromVehicleEventRecord(item: VehicleEventRecord) {
    let model = new CommonDetailModel();
    model.Title = '车辆布控报警';
    model.ContainerWidth = 820;
    model.ContainerHeight = 470;
    model.LeftWidth = 180;
    model.LinePerRecord = LinePerRecord.Two;

    model.ImageUrl = Medium.img(item.ImageUrl);
    model.BackgroundImageUrl = Medium.img(item.ImageUrl);
    model.Records = [
      {
        Icon: 'howell-icon-license_plate',
        PropertyDes: '车牌号码',
        PropertyValue: item.Data.PlateNo ?? '未知',
      },

      {
        Icon: 'howell-icon-Face',
        PropertyDes: '车身颜色',
        PropertyValue: item.Data.VehicleColorName ?? '未知',
      },
      {
        Icon: 'howell-icon-color',
        PropertyDes: '车牌颜色',
        PropertyValue: item.Data.PlateColorName ?? '未知',
      },
      {
        Icon: 'howell-icon-color',
        PropertyDes: '颜色深浅',
        PropertyValue: item.Data.VehicleColorDepthName ?? '未知',
      },
      {
        Icon: 'howell-icon-license_plate',
        PropertyDes: '车牌类型',
        PropertyValue: item.Data.PlateTypeName ?? '未知',
      },
      {
        Icon: 'howell-icon-car2',
        PropertyDes: '车辆类型',
        PropertyValue: item.Data.VehicleLogoName ?? '未知',
      },
      {
        Icon: 'howell-icon-license_plate',
        PropertyDes: '车牌尾号',
        PropertyValue: item.Data.PlateTypeName ?? '未知',
      },
      {
        Icon: 'howell-icon-car2',
        PropertyDes: '车辆主品牌',
        PropertyValue: item.Data.PlateTypeName ?? '未知',
      },
      {
        Icon: 'howell-icon-car2',
        PropertyDes: '车牌省份',
        PropertyValue: item.Data.PlateNo ?? '未知',
      },
      {
        Icon: 'howell-icon-car2',
        PropertyDes: '车牌子品牌',
        PropertyValue: item.Data.VehicleSubLogoName ?? '未知',
      },
      {
        Icon: 'howell-icon-car2e',
        PropertyDes: '车牌状态',
        PropertyValue: item.Data.PlateTypeName ?? '未知',
      },
      {
        Icon: 'howell-icon-speed',
        PropertyDes: '车辆速度',
        PropertyValue: item.Data.VehicleSpeed?.toString() ?? '未知',
      },
      {
        Icon: 'howell-icon-user-admi',
        PropertyDes: '安全带',
        PropertyValue: item.Data.PilotSafebeltName ?? '未知',
      },
      {
        Icon: 'howell-icon-phone',
        PropertyDes: '打电话',
        PropertyValue: item.Data.UsePhoneName ?? '未知',
      },
    ];

    return model;
  }

  private _fromMuckCarEventRecord(item: MuckCarEventRecord) {
    let model = new CommonDetailModel();
    model.Title = '渣土车布控报警';
    model.ContainerWidth = 655;
    model.ContainerHeight = 470;
    model.LeftWidth = 180;
    model.LinePerRecord = LinePerRecord.One;

    model.ImageUrl = Medium.img(item.Data.ThumbnailUrl);
    model.BackgroundImageUrl = Medium.img(item.Data.BackgroundImageUrl);
    model.Records = [
      {
        Icon: 'howell-icon-license_plate',
        PropertyDes: '车牌号码',
        PropertyValue: item.Data.PlateNo ?? '未知',
      },

      {
        Icon: 'howell-icon-color',
        PropertyDes: '车身颜色',
        PropertyValue: item.Data.VehicleColorName ?? '未知',
      },
      {
        Icon: 'howell-icon-color',
        PropertyDes: '车牌颜色',
        PropertyValue: item.Data.PlateColor ?? '未知',
      },
      {
        Icon: 'howell-icon-Face',
        PropertyDes: '卡口名称',
        PropertyValue: item.Data.CrossingName ?? '未知',
      },
      {
        Icon: 'howell-icon-dustcart',
        PropertyDes: '违规类型',
        PropertyValue: item.Data.IntelligentTypeName ?? '未知',
      },
    ];

    return model;
  }

  private _fromBodyRecord(item: BodyRecord) {
    let model = new CommonDetailModel();
    model.Title = '详细信息';
    model.ContainerWidth = 820;
    model.ContainerHeight = 470;
    model.LeftWidth = 180;
    model.LinePerRecord = LinePerRecord.Two;

    model.ImageUrl = Medium.img(item.TargetPictureUrl);
    model.BackgroundImageUrl = Medium.img(item.BackgroundUrl);
    model.Records = [
      {
        Icon: 'howell-icon-sex',
        PropertyDes: '性别',
        PropertyValue: item.GenderName ?? '未知',
      },

      {
        Icon: 'howell-icon-hairstyle',
        PropertyDes: '发型',
        PropertyValue: item.HairStyleName ?? '未知',
      },
      {
        Icon: 'howell-icon-birthday',
        PropertyDes: '年龄段',
        PropertyValue: item.AgeGroupName ?? '未知',
      },
      {
        Icon: 'howell-icon-jacket',
        PropertyDes: '上衣类型',
        PropertyValue: item.JacketTypeName ?? '未知',
      },
      {
        Icon: 'howell-icon-sunglasses',
        PropertyDes: '是否戴眼镜',
        PropertyValue: item.GlassName ?? '未知',
      },
      {
        Icon: 'howell-icon-color',
        PropertyDes: '上衣颜色',
        PropertyValue: item.JacketColorName ?? '未知',
      },
      {
        Icon: 'howell-icon-bag',
        PropertyDes: '是否背包',
        PropertyValue: item.BagName ?? '未知',
      },
      {
        Icon: 'howell-icon-trousers',
        PropertyDes: '下衣类型',
        PropertyValue: item.TrousersTypeName ?? '未知',
      },
      {
        Icon: 'howell-icon-hat',
        PropertyDes: '是否戴帽子',
        PropertyValue: item.HatName ?? '未知',
      },
      {
        Icon: 'howell-icon-color',
        PropertyDes: '下衣颜色',
        PropertyValue: item.TrousersColorName ?? '未知',
      },
      {
        Icon: 'howell-icon-mask',
        PropertyDes: '是否戴口罩',
        PropertyValue: item.MaskName ?? '未知',
      },
      {
        Icon: 'howell-icon-bicycle',
        PropertyDes: '是否骑车',
        PropertyValue: item.RideName ?? '未知',
      },
      {
        Icon: 'howell-icon-carrying',
        PropertyDes: '是否拎东西',
        PropertyValue: item.ThingsName ?? '未知',
      },
      {
        Icon: 'howell-icon-bicycle',
        PropertyDes: '骑车类型',
        PropertyValue: item.CyclingTypeName ?? '未知',
      },
    ];

    return model;
  }

  private _fromFaceRecord(item: FaceRecord) {
    let model = new CommonDetailModel();
    model.Title = '详细信息';
    model.ContainerWidth = 655;
    model.ContainerHeight = 470;
    model.LeftWidth = 180;
    model.LinePerRecord = LinePerRecord.One;

    model.ImageUrl = Medium.img(item.FacePictureUrl);

    model.BackgroundImageUrl = Medium.img(item.BackgroundUrl);
    model.Records = [
      {
        Icon: 'howell-icon-Face',
        PropertyDes: '姓名',
        PropertyValue: item.Name ?? '未知',
      },

      {
        Icon: 'howell-icon-sex',
        PropertyDes: '性别',
        PropertyValue: item.GenderName ?? '未知',
      },
      {
        Icon: 'howell-icon-birthday',
        PropertyDes: '年龄段',
        PropertyValue: item.AgeGroupName ?? '未知',
      },

      {
        Icon: 'howell-icon-sunglasses',
        PropertyDes: '是否戴眼镜',
        PropertyValue: item.GlassName ?? '未知',
      },
      {
        Icon: 'howell-icon-Face',
        PropertyDes: '是否微笑',
        PropertyValue: item.SmileName ?? '未知',
      },
      {
        Icon: 'howell-icon-video',
        PropertyDes: '抓拍摄像机',
        PropertyValue: item.CameraName ?? '未知',
      },
      {
        Icon: 'howell-icon-time',
        PropertyDes: '抓拍时间',
        PropertyValue: item.CaptureTime
          ? formatDate(item.CaptureTime, 'yyyy-MM-dd HH:mm:ss', 'en')
          : '未知',
      },
    ];

    return model;
  }

  private _fromVehicleRecord(item: VehicleRecord) {
    let model = new CommonDetailModel();
    model.Title = '详细信息';
    model.ContainerWidth = 820;
    model.ContainerHeight = 460;
    model.LeftWidth = 180;
    model.LinePerRecord = LinePerRecord.Two;

    model.ImageUrl = Medium.img(item.PlatePictureUrl);
    model.BackgroundImageUrl = Medium.img(item.BackgroundUrl);
    model.Records = [
      {
        Icon: 'howell-icon-license_plate',
        PropertyDes: '车牌号码',
        PropertyValue: item.PlateNo ?? '未知',
      },
      {
        Icon: 'howell-icon-color',
        PropertyDes: '车身颜色',
        PropertyValue: item.VehicleColorName ?? '未知',
      },
      {
        Icon: 'howell-icon-color',
        PropertyDes: '车牌颜色',
        PropertyValue: item.PlateColorName ?? '未知',
      },
      {
        Icon: 'howell-icon-color',
        PropertyDes: '颜色深浅',
        PropertyValue: item.VehicleColorDepthName ?? '未知',
      },
      {
        Icon: 'howell-icon-license_plate',
        PropertyDes: '车牌类型',
        PropertyValue: item.PlateTypeName ?? '未知',
      },
      {
        Icon: 'howell-icon-car2',
        PropertyDes: '车辆类型',
        PropertyValue: item.VehicleTypeName ?? '未知',
      },

      {
        Icon: 'howell-icon-license_plate',
        PropertyDes: '车牌尾号',
        PropertyValue: item.PlateTail ?? '未知',
      },
      {
        Icon: 'howell-icon-car2',
        PropertyDes: '车辆主品牌',
        PropertyValue: item.VehicleLogoName ?? '未知',
      },

      {
        Icon: 'howell-icon-car2',
        PropertyDes: '车牌省份',
        PropertyValue: item.PlateProvince ?? '未知',
      },

      {
        Icon: 'howell-icon-car2',
        PropertyDes: '车辆子品牌',
        PropertyValue: item.VehicleSubLogoName ?? '未知',
      },
      {
        Icon: 'howell-icon-car2',
        PropertyDes: '车牌状态',
        PropertyValue: item.PlateStateName ?? '未知',
      },
      {
        Icon: 'howell-icon-speed',
        PropertyDes: '车辆速度',
        PropertyValue: item.VehicleSpeed?.toString() ?? '未知',
      },

      {
        Icon: 'howell-icon-user-admin',
        PropertyDes: '是否系安全带',
        PropertyValue: item.PilotSafebeltName ?? '未知',
      },
      {
        Icon: 'howell-icon-phone',
        PropertyDes: '是否打电话',
        PropertyValue: item.UsePhoneName ?? '未知',
      },
    ];

    return model;
  }

  private _fromFaceTask(item: FaceDeployControlTask) {
    let model = new CommonDetailModel();
    model.Title = '人脸布控任务';
    model.ContainerWidth = 655;
    model.ContainerHeight = 310;
    model.LeftWidth = 180;
    model.LinePerRecord = LinePerRecord.One;

    model.ImageUrl = item.ImageData;
    model.Records = [
      {
        Icon: 'howell-icon-details',
        PropertyDes: '任务名称',
        PropertyValue: item.TaskName ?? '未知',
      },
      {
        Icon: 'howell-icon-time',
        PropertyDes: '开始时间',
        PropertyValue:
          formatDate(item.BeginTime, 'yyyy-MM-dd HH:mm:ss', 'en') ?? '未知',
      },
      {
        Icon: 'howell-icon-time',
        PropertyDes: '结束时间',
        PropertyValue:
          formatDate(item.EndTime, 'yyyy-MM-dd HH:mm:ss', 'en') ?? '未知',
      },
      {
        Icon: 'mdi mdi-note-outline',
        PropertyDes: '备注',
        PropertyValue: item.Remark ?? '',
      },
    ];

    return model;
  }

  private _fromVehicleTask(item: VehicleDeployControlTask) {
    let model = new CommonDetailModel();
    model.Title = '车辆布控任务';
    model.ContainerWidth = 520;
    model.ContainerHeight = 520;
    model.LeftWidth = 0;
    model.LinePerRecord = LinePerRecord.One;

    model.Records = [
      {
        Icon: 'howell-icon-details',
        PropertyDes: '任务名称',
        PropertyValue: item.TaskName ?? '未知',
      },
      {
        Icon: 'howell-icon-time',
        PropertyDes: '开始时间',
        PropertyValue:
          formatDate(item.BeginTime, 'yyyy-MM-dd HH:mm:ss', 'en') ?? '未知',
      },
      {
        Icon: 'howell-icon-time',
        PropertyDes: '结束时间',
        PropertyValue:
          formatDate(item.EndTime, 'yyyy-MM-dd HH:mm:ss', 'en') ?? '未知',
      },
      {
        Icon: 'howell-icon-license_plate',
        PropertyDes: '车牌号码',
        PropertyValue: item.PlateNo ?? '未知',
      },
      {
        Icon: 'howell-icon-color',
        PropertyDes: '车身颜色',
        PropertyValue: item.VehicleColorName ?? '未知',
      },
      {
        Icon: 'howell-icon-color',
        PropertyDes: '车牌颜色',
        PropertyValue: item.PlateColorName ?? '未知',
      },
      {
        Icon: 'howell-icon-car2',
        PropertyDes: '车辆类型',
        PropertyValue: item.VehicleTypeName ?? '未知',
      },
      {
        Icon: 'howell-icon-car2',
        PropertyDes: '车辆主品牌',
        PropertyValue: item.VehicleLogoName ?? '未知',
      },
    ];

    return model;
  }
}
