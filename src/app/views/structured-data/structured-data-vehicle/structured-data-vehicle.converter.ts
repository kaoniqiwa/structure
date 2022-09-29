import { formatDate } from '@angular/common';
import { IPromiseConverter } from 'src/app/interfaces/converter.interface';
import { PagedList } from 'src/app/models/page-list.model';
import { VehicleRecord } from 'src/app/models/vehicle-record.model';
import { Medium } from 'src/app/tools/medium';
import {
  StructuredDataItemIconModel,
  StructuredDataItemModel,
} from '../structured-data-item/structured-data-item.model';

export class StructuredDataVehicleConverter
  implements
    IPromiseConverter<
      PagedList<VehicleRecord>,
      PagedList<StructuredDataItemModel<VehicleRecord>>
    >
{
  item = new StructuredDataVehicleItemConverter();
  async Convert(
    source: PagedList<VehicleRecord>,
    ...res: any[]
  ): Promise<PagedList<StructuredDataItemModel<VehicleRecord>>> {
    let paged = new PagedList<StructuredDataItemModel<VehicleRecord>>();
    paged.Page = source.Page;
    paged.Data = [];
    for (let i = 0; i < source.Data.length; i++) {
      const data = source.Data[i];
      let item = await this.item.Convert(data);
      paged.Data.push(item);
    }
    return paged;
  }
}

export class StructuredDataVehicleItemConverter
  implements
    IPromiseConverter<VehicleRecord, StructuredDataItemModel<VehicleRecord>>
{
  async Convert(
    source: VehicleRecord,
    ...res: any[]
  ): Promise<StructuredDataItemModel<VehicleRecord>> {
    let model = new StructuredDataItemModel<VehicleRecord>();
    model.data = source;
    let img1 = await Medium.img(source.PlatePictureUrl);
    let img2 = await Medium.img(source.BackgroundUrl);
    model.images = [img1, img2];

    model.datas = [
      {
        icon: 'howell-icon-face-recognition',
        name: source.PlateNo ?? '',
      },
      {
        icon: 'howell-icon-car',
        name: source.VehicleColorName ?? '',
      },
      {
        icon: 'howell-icon-camera',
        name: source.CameraName ?? '',
      },
      {
        icon: 'howell-icon-time',
        name: source.CaptureTime
          ? formatDate(source.CaptureTime, 'yyyy-MM-dd HH:mm:ss', 'en')
          : '',
      },
    ];

    return model;
  }
}
