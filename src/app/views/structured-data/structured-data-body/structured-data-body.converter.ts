import { formatDate } from '@angular/common';
import { IPromiseConverter } from 'src/app/interfaces/converter.interface';
import { BodyRecord } from 'src/app/models/body-record.model';
import { PagedList } from 'src/app/models/page-list.model';
import { Medium } from 'src/app/tools/medium';
import { StructuredDataItemModel } from '../structured-data-item/structured-data-item.model';

export class StructuredDataBodyConverter
  implements
    IPromiseConverter<
      PagedList<BodyRecord>,
      PagedList<StructuredDataItemModel<BodyRecord>>
    >
{
  item = new StructuredDataBodyItemConverter();
  async Convert(
    source: PagedList<BodyRecord>,
    ...res: any[]
  ): Promise<PagedList<StructuredDataItemModel<BodyRecord>>> {
    let paged = new PagedList<StructuredDataItemModel<BodyRecord>>();
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

class StructuredDataBodyItemConverter
  implements IPromiseConverter<BodyRecord, StructuredDataItemModel<BodyRecord>>
{
  async Convert(
    source: BodyRecord,
    ...res: any[]
  ): Promise<StructuredDataItemModel<BodyRecord>> {
    let model = new StructuredDataItemModel<BodyRecord>();
    model.data = source;
    let img1 = Medium.img(source.TargetPictureUrl);
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
