import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventRecord } from 'src/app/models/event-record/event.record';

@Component({
  selector: 'app-face-deploy-detail',
  templateUrl: './face-deploy-detail.component.html',
  styleUrls: ['./face-deploy-detail.component.less'],
})
export class FaceDeployDetailComponent implements OnInit {
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
