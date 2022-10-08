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

@Injectable({
  providedIn: 'root',
})
export class CommonDetailConverter {
  Convert(source: IModel, ...res: any[]): Promise<CommonDetailModel> {
    if (source instanceof FaceEventRecord) {
      return this._fromFaceEventRecord(source);
    } else if (source instanceof VehicleEventRecord) {
      return this._fromVehicleEventRecord(source);
    } else if (source instanceof BodyRecord) {
      return this._fromBodyRecord(source);
    } else if (source instanceof FaceRecord) {
      return this._fromFaceRecord(source);
    }
    throw new Error('Error');
  }
  private async _fromFaceEventRecord(item: FaceEventRecord) {
    let model = new CommonDetailModel();
    model.Title = '人脸布控报警';
    model.ContainerWidth = 655;
    model.ContainerHeight = 470;
    model.LeftWidth = 180;
    model.LinePerRecord = LinePerRecord.One;
    // model.ImageUrl = 'assets/img/sample-face.png';
    // model.BackgroundImageUrl = 'assets/img/sample-face.png';

    model.ImageUrl = (await Medium.image(item.ImageUrl)).url;
    model.BackgroundImageUrl = (
      await Medium.image(item.Data.BackgroundImageUrl)
    ).url;
    model.Records = [
      {
        Icon: 'howell-icon-Face',
        PropertyDes: '报警名称',
        PropertyValue: item.Data.TaskName ?? '未知',
      },

      {
        Icon: 'howell-icon-Face',
        PropertyDes: '性别',
        PropertyValue: item.Data.RegisterGender
          ? Language.GenderType(item.Data.RegisterGender)
          : '未知',
      },
      {
        Icon: 'howell-icon-Face',
        PropertyDes: '人员姓名',
        PropertyValue: item.Data.PersonName ?? '未知',
      },
      {
        Icon: 'howell-icon-Face',
        PropertyDes: '证件号码',
        PropertyValue: item.Data.CertificateNumber ?? '未知',
      },
      {
        Icon: 'howell-icon-Face',
        PropertyDes: '抓拍相机',
        PropertyValue: item.ResourceName ?? '未知',
      },
      {
        Icon: 'howell-icon-Face',
        PropertyDes: '抓拍时间',
        PropertyValue:
          formatDate(item.EventTime, 'yyyy-MM-dd HH:mm:ss', 'en') ?? '未知',
      },
    ];

    return model;
  }

  private async _fromVehicleEventRecord(item: VehicleEventRecord) {
    let model = new CommonDetailModel();
    model.Title = '车辆布控报警';
    model.ContainerWidth = 820;
    model.ContainerHeight = 550;
    model.LeftWidth = 180;
    model.LinePerRecord = LinePerRecord.Two;

    model.ImageUrl = (await Medium.image(item.ImageUrl)).url;
    model.BackgroundImageUrl = (await Medium.image(item.ImageUrl)).url;
    model.Records = [
      {
        Icon: 'howell-icon-Face',
        PropertyDes: '车牌号码',
        PropertyValue: item.Data.PlateNo ?? '未知',
      },

      {
        Icon: 'howell-icon-Face',
        PropertyDes: '车身颜色',
        PropertyValue: item.Data.VehicleColorName ?? '未知',
      },
      {
        Icon: 'howell-icon-Face',
        PropertyDes: '车牌颜色',
        PropertyValue: item.Data.PlateColor ?? '未知',
      },
      {
        Icon: 'howell-icon-Face',
        PropertyDes: '颜色深浅',
        PropertyValue: item.Data.VehicleColorDepthName ?? '未知',
      },
      {
        Icon: 'howell-icon-Face',
        PropertyDes: '车牌类型',
        PropertyValue: item.Data.PlateType ?? '未知',
      },
      {
        Icon: 'howell-icon-Face',
        PropertyDes: '车辆类型',
        PropertyValue: item.Data.VehicleLogoName ?? '未知',
      },
      {
        Icon: 'howell-icon-Face',
        PropertyDes: '车牌尾号',
        PropertyValue: item.Data.PlateTypeName ?? '未知',
      },
      {
        Icon: 'howell-icon-Face',
        PropertyDes: '车辆主品牌',
        PropertyValue: item.Data.PlateTypeName ?? '未知',
      },
      {
        Icon: 'howell-icon-Face',
        PropertyDes: '车牌省份',
        PropertyValue: item.Data.PlateNo ?? '未知',
      },
      {
        Icon: 'howell-icon-Face',
        PropertyDes: '车牌子品牌',
        PropertyValue: item.Data.VehicleSubLogoName ?? '未知',
      },
      {
        Icon: 'howell-icon-Face',
        PropertyDes: '车牌状态',
        PropertyValue: item.Data.PlateTypeName ?? '未知',
      },
      {
        Icon: 'howell-icon-Face',
        PropertyDes: '车辆速度',
        PropertyValue: item.Data.VehicleSpeed?.toString() ?? '未知',
      },
      {
        Icon: 'howell-icon-Face',
        PropertyDes: '安全带',
        PropertyValue: item.Data.PilotSafebelt ? '是' : '否',
      },
      {
        Icon: 'howell-icon-Face',
        PropertyDes: '打电话',
        PropertyValue: item.Data.UsePhone ? '是' : '否',
      },
    ];

    return model;
  }

  private async _fromBodyRecord(item: BodyRecord) {
    let model = new CommonDetailModel();
    model.Title = '详细信息';
    model.ContainerWidth = 820;
    model.ContainerHeight = 550;
    model.LeftWidth = 180;
    model.LinePerRecord = LinePerRecord.Two;

    model.ImageUrl = (await Medium.image(item.TargetPictureUrl)).url;
    model.BackgroundImageUrl = (await Medium.image(item.BackgroundUrl)).url;
    model.Records = [
      {
        Icon: 'howell-icon-Face',
        PropertyDes: '性别',
        PropertyValue: item.GenderName ?? '未知',
      },

      {
        Icon: 'howell-icon-Face',
        PropertyDes: '发型',
        PropertyValue: item.HairStyleName ?? '未知',
      },
      {
        Icon: 'howell-icon-Face',
        PropertyDes: '年龄段',
        PropertyValue: item.AgeGroupName ?? '未知',
      },
      {
        Icon: 'howell-icon-Face',
        PropertyDes: '上衣类型',
        PropertyValue: item.JacketTypeName ?? '未知',
      },
      {
        Icon: 'howell-icon-Face',
        PropertyDes: '是否戴眼镜',
        PropertyValue: item.GlassName ?? '未知',
      },
      {
        Icon: 'howell-icon-Face',
        PropertyDes: '上衣颜色',
        PropertyValue: item.JacketColorName ?? '未知',
      },
      {
        Icon: 'howell-icon-Face',
        PropertyDes: '是否背包',
        PropertyValue: item.BagName ?? '未知',
      },
      {
        Icon: 'howell-icon-Face',
        PropertyDes: '下衣类型',
        PropertyValue: item.TrousersTypeName ?? '未知',
      },
      {
        Icon: 'howell-icon-Face',
        PropertyDes: '是否戴帽子',
        PropertyValue: item.HatName ?? '未知',
      },
      {
        Icon: 'howell-icon-Face',
        PropertyDes: '下衣颜色',
        PropertyValue: item.TrousersColorName ?? '未知',
      },
      {
        Icon: 'howell-icon-Face',
        PropertyDes: '是否戴口罩',
        PropertyValue: item.MaskName ?? '未知',
      },
      {
        Icon: 'howell-icon-Face',
        PropertyDes: '是否骑车',
        PropertyValue: item.RideName ?? '未知',
      },
      {
        Icon: 'howell-icon-Face',
        PropertyDes: '是否拎东西',
        PropertyValue: item.ThingsName ? '是' : '否',
      },
      {
        Icon: 'howell-icon-Face',
        PropertyDes: '骑车类型',
        PropertyValue: item.CyclingTypeName ? '是' : '否',
      },
    ];

    return model;
  }

  private async _fromFaceRecord(item: FaceRecord) {
    let model = new CommonDetailModel();
    model.Title = '详细信息';
    model.ContainerWidth = 655;
    model.ContainerHeight = 470;
    model.LeftWidth = 180;
    model.LinePerRecord = LinePerRecord.One;

    model.ImageUrl = (await Medium.image(item.FacePictureUrl)).url;
    model.BackgroundImageUrl = (await Medium.image(item.BackgroundUrl)).url;
    model.Records = [
      {
        Icon: 'howell-icon-Face',
        PropertyDes: '姓名',
        PropertyValue: item.Name ?? '未知',
      },

      {
        Icon: 'howell-icon-Face',
        PropertyDes: '性别',
        PropertyValue: item.GenderName ?? '未知',
      },
      {
        Icon: 'howell-icon-Face',
        PropertyDes: '年龄段',
        PropertyValue: item.AgeGroupName ?? '未知',
      },

      {
        Icon: 'howell-icon-Face',
        PropertyDes: '是否戴眼镜',
        PropertyValue: item.GlassName ? '是' : '否',
      },
      {
        Icon: 'howell-icon-Face',
        PropertyDes: '是否微笑',
        PropertyValue: item.Smile ? '是' : '否',
      },

      {
        Icon: 'howell-icon-Face',
        PropertyDes: '抓拍时间',
        PropertyValue: item.CaptureTime
          ? formatDate(item.CaptureTime, 'yyyy-MM-dd HH:mm:ss', 'en')
          : '未知',
      },
    ];

    return model;
  }
}
