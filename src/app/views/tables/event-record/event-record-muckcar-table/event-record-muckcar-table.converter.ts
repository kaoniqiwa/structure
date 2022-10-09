import { IConverter } from 'src/app/interfaces/converter.interface';
import { MuckCarEventRecord } from 'src/app/models/event-record/muck-car-event.record';

import { PagedList } from 'src/app/models/page-list.model';
import { Medium } from 'src/app/tools/medium';
import { EventRecordMuckCarTableModel } from './event-record-muckcar-table.model';

export class EventRecordMuckCarTableConverter
  implements
    IConverter<
      PagedList<MuckCarEventRecord>,
      PagedList<EventRecordMuckCarTableModel>
    >
{
  item = new EventRecordMuckCarTableItemConverter();
  Convert(
    source: PagedList<MuckCarEventRecord>,
    ...res: any[]
  ): PagedList<EventRecordMuckCarTableModel<MuckCarEventRecord>> {
    let paged = new PagedList<
      EventRecordMuckCarTableModel<MuckCarEventRecord>
    >();
    paged.Page = source.Page;
    paged.Data = source.Data.map((x) => {
      return this.item.Convert(x);
    });
    return paged;
  }
}

class EventRecordMuckCarTableItemConverter
  implements IConverter<MuckCarEventRecord, EventRecordMuckCarTableModel>
{
  Convert(
    source: MuckCarEventRecord,
    ...res: any[]
  ): EventRecordMuckCarTableModel<MuckCarEventRecord> {
    let model = new EventRecordMuckCarTableModel<MuckCarEventRecord>();
    model.data = source;
    model.id = source.Id;
    model.cameraName = source.ResourceName ?? '';
    model.eventName = source.Data.CrossingName ?? '';
    model.plateNo = source.Data.PlateNo ?? '';
    model.time = source.EventTime;
    model.imageUrl = Medium.img(source.Data.ThumbnailUrl);
    model.backgroundImageUrl = Medium.img(source.Data.BackgroundImageUrl);
    return model;
  }
}
