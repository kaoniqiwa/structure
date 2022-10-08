import { Component, Input, OnInit } from '@angular/core';
import { EventRecordType } from './event-record.model';

@Component({
  selector: 'app-event-record',
  templateUrl: './event-record.component.html',
  styleUrls: ['./event-record.component.less'],
})
export class EventRecordComponent implements OnInit {
  @Input()
  path: EventRecordType = EventRecordType.face;
  constructor() {}
  EventRecordType = EventRecordType;
  ngOnInit(): void {}
  navigation(path: EventRecordType) {
    this.path = path;
  }
}
