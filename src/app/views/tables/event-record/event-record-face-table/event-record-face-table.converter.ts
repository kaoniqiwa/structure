import { IConverter } from 'src/app/interfaces/converter.interface';
import { FaceEventRecord } from 'src/app/models/event-record/face-event.record';
import { PagedList } from 'src/app/models/page-list.model';
import { Medium } from 'src/app/tools/medium';
import { EventRecordFaceTableModel } from './event-record-face-table.model';

export class EventRecordFaceTableConverter
  implements
    IConverter<
      PagedList<FaceEventRecord>,
      PagedList<EventRecordFaceTableModel>
    >
{
  item = new EventRecordFaceTableItemConverter();
  Convert(
    source: PagedList<FaceEventRecord>,
    ...res: any[]
  ): PagedList<EventRecordFaceTableModel<FaceEventRecord>> {
    let paged = new PagedList<EventRecordFaceTableModel<FaceEventRecord>>();
    paged.Page = source.Page;
    paged.Data = source.Data.map((x) => {
      return this.item.Convert(x);
    });
    return paged;
  }
}

class EventRecordFaceTableItemConverter
  implements IConverter<FaceEventRecord, EventRecordFaceTableModel>
{
  Convert(
    source: FaceEventRecord,
    ...res: any[]
  ): EventRecordFaceTableModel<FaceEventRecord> {
    let model = new EventRecordFaceTableModel<FaceEventRecord>();
    model.data = source;
    model.id = source.Id;
    model.cameraName = source.ResourceName ?? '';
    model.eventName = source.Data.TaskName ?? '';
    model.personName = source.Data.PersonName ?? '';
    model.time = source.EventTime;
    model.imageSrc = Medium.jpg(source.ImageUrl);
    return model;
  }
}
