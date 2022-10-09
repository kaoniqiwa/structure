import { Duration } from 'src/app/models/duration.model';
import { FaceEventRecord } from 'src/app/models/event-record/face-event.record';
import { Page } from 'src/app/models/page-list.model';
import { DateTimeTool } from 'src/app/tools/datetime.tool';

export class EventRecordFaceTableModel<T = any> {
  data?: T;
  id: string = '';
  eventName: string = '-';
  cameraName: string = '-';
  time: Date = new Date();
  personName: string = '-';
}
export class EventRecordFaceTableArgs {
  page?: Page;
  name?: string;
  duration: Duration = DateTimeTool.allDay(new Date());
}
