import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventRecord } from 'src/app/models/event-record/event.record';
import { FaceDetailBusiness } from './face-detail.business';
import { FaceDetailModel } from './face-detail.model';

@Component({
  selector: 'app-face-detail',
  templateUrl: './face-detail.component.html',
  styleUrls: ['./face-detail.component.less'],
  providers: [FaceDetailBusiness],
})
export class FaceDetailComponent implements OnInit {
  @Input() eventRecord?: EventRecord;

  @Output() closeEvent = new EventEmitter<boolean>();

  model?: FaceDetailModel;

  constructor(private _business: FaceDetailBusiness) {}

  async ngOnInit() {
    if (this.eventRecord) {
      this.model = await this._business.init(this.eventRecord);
    }
  }
  close() {
    this.closeEvent.emit(false);
  }
}
