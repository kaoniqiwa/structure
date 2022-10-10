import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VideoArgs } from 'src/app/models/args/video.args';
import { EventRecord } from 'src/app/models/event-record/event.record';
import { EventRecordType } from './event-record.model';

@Component({
  selector: 'app-event-record',
  templateUrl: './event-record.component.html',
  styleUrls: ['./event-record.component.less'],
})
export class EventRecordComponent implements OnInit {
  @Input()
  path: EventRecordType = EventRecordType.face;

  @Output()
  details: EventEmitter<EventRecord> = new EventEmitter();
  @Output()
  playback: EventEmitter<VideoArgs> = new EventEmitter();
  constructor() {}
  EventRecordType = EventRecordType;
  ngOnInit(): void {}
  navigation(path: EventRecordType) {
    this.path = path;
  }
  ondetails(model: EventRecord) {
    this.details.emit(model);
  }
  onplayback(args: VideoArgs) {
    this.playback.emit(args);
  }
}
