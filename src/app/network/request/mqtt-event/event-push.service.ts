import { EventEmitter, Injectable } from '@angular/core';
import { EventRecord } from 'src/app/models/event-record/event.record';
import { EventRecordType } from 'src/app/views/event-record/event-record.model';

@Injectable({
  providedIn: 'root',
})
export class EventPushService {
  pushEvent: EventEmitter<EventRecordType>;
  connectionState: EventEmitter<boolean>;
  constructor() {
    this.pushEvent = new EventEmitter<EventRecordType>();
    this.connectionState = new EventEmitter<boolean>();
  }
}
