import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventRecord } from 'src/app/models/event-record/event.record';

@Component({
  selector: 'app-body-detail',
  templateUrl: './body-detail.component.html',
  styleUrls: ['./body-detail.component.less'],
})
export class BodyDetailComponent implements OnInit {
  @Input()
  eventRecord: EventRecord | null = null;

  @Output() closeEvent = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {
    console.log(this.eventRecord);
  }
  close() {
    this.closeEvent.emit(false);
  }
}
