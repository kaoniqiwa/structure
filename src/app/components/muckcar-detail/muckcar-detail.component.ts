import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventRecord } from 'src/app/models/event-record/event.record';

@Component({
  selector: 'app-muckcar-detail',
  templateUrl: './muckcar-detail.component.html',
  styleUrls: ['./muckcar-detail.component.less'],
})
export class MuckcarDetailComponent implements OnInit {
  @Input()
  eventRecord?: EventRecord | null = null;

  @Output() closeEvent = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {
    console.log(this.eventRecord);
  }
  close() {
    this.closeEvent.emit(false);
  }
}
