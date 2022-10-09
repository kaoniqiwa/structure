import { IConverter } from 'src/app/interfaces/converter.interface';
import { VehicleEventRecord } from 'src/app/models/event-record/vehicle-event.record';

import { PagedList } from 'src/app/models/page-list.model';
import { Medium } from 'src/app/tools/medium';
import { EventRecordVehicleTableModel } from './event-record-vehicle-table.model';

export class EventRecordVehicleTableConverter
  implements
    IConverter<
      PagedList<VehicleEventRecord>,
      PagedList<EventRecordVehicleTableModel>
    >
{
  item = new EventRecordVehicleTableItemConverter();
  Convert(
    source: PagedList<VehicleEventRecord>,
    ...res: any[]
  ): PagedList<EventRecordVehicleTableModel<VehicleEventRecord>> {
    let paged = new PagedList<
      EventRecordVehicleTableModel<VehicleEventRecord>
    >();
    paged.Page = source.Page;
    paged.Data = source.Data.map((x) => {
      return this.item.Convert(x);
    });
    return paged;
  }
}

class EventRecordVehicleTableItemConverter
  implements IConverter<VehicleEventRecord, EventRecordVehicleTableModel>
{
  Convert(
    source: VehicleEventRecord,
    ...res: any[]
  ): EventRecordVehicleTableModel<VehicleEventRecord> {
    let model = new EventRecordVehicleTableModel<VehicleEventRecord>();
    model.data = source;
    model.id = source.Id;
    model.cameraName = source.ResourceName ?? '';
    model.eventName = source.Data.TaskName ?? '';
    model.plateNo = source.Data.PlateNo ?? '';
    model.time = source.EventTime;
    model.imageUrl = Medium.img(source.ImageUrl);
    model.plateImageUrl = Medium.img(source.Data.PlateImageUrl);
    return model;
  }
}
