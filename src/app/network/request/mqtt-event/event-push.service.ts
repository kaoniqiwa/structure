import { EventEmitter, Injectable } from '@angular/core';
import { EventRecord } from 'src/app/models/event-record/event.record';

@Injectable({
  providedIn: 'root',
})
export class EventPushService {
  pushEvent: EventEmitter<EventRecord>;
  connectionState: EventEmitter<boolean>;
  constructor() {
    this.pushEvent = new EventEmitter<EventRecord>();
    this.connectionState = new EventEmitter<boolean>();
  }
}
