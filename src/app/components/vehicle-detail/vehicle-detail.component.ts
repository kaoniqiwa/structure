import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventRecord } from 'src/app/models/event-record/event.record';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.less'],
})
export class VehicleDetailComponent implements OnInit {
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
