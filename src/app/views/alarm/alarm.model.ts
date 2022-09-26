import { EventType } from 'src/app/enums/event-type.enum';

export class AlarmModel<T = any> {
  id!: string;
  name: string = '';
  type!: EventType;
  time: Date = new Date();
  data!: T;
  nodeName: string = '';
}
