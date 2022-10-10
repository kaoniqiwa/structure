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
  imageUrl!: Promise<string>;
  backgroundImageUrl!: Promise<string>;
}
export class EventRecordFaceTableArgs {
  page: Page = new Page();
  name?: string;
  duration!: Duration;
  cameraIds?: string[];
}
