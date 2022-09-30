import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BodyRecord } from 'src/app/models/body-record.model';
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
  bodyRecord?: BodyRecord | null = null;

  @Output() closeEvent = new EventEmitter<boolean>();

  model?: BodyDetailModel;

  constructor(private _business: BodyDetailBusiness) {}

  async ngOnInit() {
    if (this.bodyRecord) {
      this.model = await this._business.init(this.bodyRecord);
    }
  }
  close() {
    this.closeEvent.emit(false);
  }
}
