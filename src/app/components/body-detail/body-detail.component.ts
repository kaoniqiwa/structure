import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventRecord } from 'src/app/models/event-record/event.record';
import { BodyDetailBusiness } from './body-detail.business';
import { BodyDetailModel } from './body-detail.model';

@Component({
  selector: 'app-body-detail',
  templateUrl: './body-detail.component.html',
  styleUrls: ['./body-detail.component.less'],
  providers: [BodyDetailBusiness],
})
export class BodyDetailComponent implements OnInit {
  @Input()
  eventRecord?: EventRecord | null = null;

  @Output() closeEvent = new EventEmitter<boolean>();

  model?: BodyDetailModel;

  constructor(private _business: BodyDetailBusiness) {}

  async ngOnInit() {
    if (this.eventRecord) {
      this.model = await this._business.init(this.eventRecord);
    }
  }
  close() {
    this.closeEvent.emit(false);
  }
}
