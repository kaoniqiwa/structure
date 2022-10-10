import { Duration } from 'src/app/models/duration.model';
import { Page } from 'src/app/models/page-list.model';

export class EventRecordMuckCarTableModel<T = any> {
  data?: T;
  id: string = '';
  eventName: string = '-';
  cameraName: string = '-';
  time: Date = new Date();
  plateNo: string = '-';
  imageUrl!: Promise<string>;
  backgroundImageUrl!: Promise<string>;
}
export class EventRecordMuckCarTableArgs {
  page: Page = new Page();
  name?: string;
  duration!: Duration;
  cameraIds?: string[];
}
