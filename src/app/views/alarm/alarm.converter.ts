import { IConverter } from 'src/app/interfaces/converter.interface';
import { EventRecord } from 'src/app/models/event-record/event.record';
import { FaceEventRecord } from 'src/app/models/event-record/face-event.record';
import { MuckCarEventRecord } from 'src/app/models/event-record/muck-car-event.record';
import { VehicleEventRecord } from 'src/app/models/event-record/vehicle-event.record';
import { AlarmModel } from './alarm.model';

export class AlarmConverter implements IConverter<EventRecord[], AlarmModel[]> {
  item = new AlarmItemConverter();
  Convert(source: EventRecord[], ...res: any[]): AlarmModel[] {
    return source.map((x) => {
      return this.item.Convert(x);
    });
  }
}
export class AlarmItemConverter implements IConverter<EventRecord, AlarmModel> {
  Convert(source: EventRecord): AlarmModel {
    let model = new AlarmModel();
    model.id = source.Id;
    model.cameraName = source.ResourceName ?? '';
    model.type = source.EventType;
    model.time = source.EventTime;
    model.data = source;

    if (source instanceof FaceEventRecord) {
      model.name = source.Data.PersonName ?? source.Data.TaskName ?? '';
    } else if (source instanceof VehicleEventRecord) {
      model.name = source.Data.PlateNo ?? '';
    } else if (source instanceof MuckCarEventRecord) {
      model.name = source.Data.PlateNo ?? '';
    } else {
    }

    return model;
  }
}
