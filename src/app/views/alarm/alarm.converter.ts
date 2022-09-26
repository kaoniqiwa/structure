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
    model.name = source.ResourceName ?? '';
    model.type = source.EventType;
    model.time = source.EventTime;
    model.data = source;

    if (source instanceof FaceEventRecord) {
      model.nodeName = source.Data.PersonName ?? '';
    } else if (source instanceof VehicleEventRecord) {
      model.nodeName = source.Data.CrossingName ?? '';
    } else if (source instanceof MuckCarEventRecord) {
      model.nodeName = source.Data.CrossingName ?? '';
    } else {
    }

    return model;
  }
}
