import { Duration } from 'src/app/models/duration.model';
import { Page } from 'src/app/models/page-list.model';

export class EventRecordVehicleTableModel<T = any> {
  data?: T;
  id: string = '';
  eventName: string = '-';
  cameraName: string = '-';
  time: Date = new Date();
  plateNo: string = '-';
  imageUrl!: Promise<string>;
  plateImageUrl!: Promise<string>;
}
export class EventRecordVehicleTableArgs {
  page: Page = new Page();
  name?: string;
  duration!: Duration;
  cameraIds?: string[];
}
