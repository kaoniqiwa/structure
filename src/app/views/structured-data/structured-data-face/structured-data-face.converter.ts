import { formatDate } from '@angular/common';
import { IPromiseConverter } from 'src/app/interfaces/converter.interface';
import { FaceRecord } from 'src/app/models/face-record.model';
import { PagedList } from 'src/app/models/page-list.model';
import { Medium } from 'src/app/tools/medium';
import { StructuredDataItemModel } from '../structured-data-item/structured-data-item.model';

export class StructuredDataFaceConverter
  implements
    IPromiseConverter<
      PagedList<FaceRecord>,
      PagedList<StructuredDataItemModel<FaceRecord>>
    >
{
  item = new StructuredDataFaceItemConverter();
  async Convert(
    source: PagedList<FaceRecord>,
    ...res: any[]
  ): Promise<PagedList<StructuredDataItemModel<FaceRecord>>> {
    let paged = new PagedList<StructuredDataItemModel<FaceRecord>>();
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

class StructuredDataFaceItemConverter
  implements IPromiseConverter<FaceRecord, StructuredDataItemModel<FaceRecord>>
{
  async Convert(
    source: FaceRecord,
    ...res: any[]
  ): Promise<StructuredDataItemModel<FaceRecord>> {
    let model = new StructuredDataItemModel<FaceRecord>();
    model.data = source;
    let img1 = Medium.img(source.FacePictureUrl);
    let img2 = Medium.img(source.BackgroundUrl);
    model.images = [img1, img2];

    model.datas = [
      {
        icon: 'howell-icon-face-recognition',
        name: source.GenderName ?? '',
      },
      {
        icon: 'howell-icon-car',
        name: source.AgeGroupName ?? '',
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
