import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventRecord } from 'src/app/models/event-record/event.record';
import { MuckcarDetailBusiness } from './muckcar-detail.business';
import { MuckcarDetailModel } from './muckcar-detail.model';

@Component({
  selector: 'app-muckcar-detail',
  templateUrl: './muckcar-detail.component.html',
  styleUrls: ['./muckcar-detail.component.less'],
  providers: [MuckcarDetailBusiness],
})
export class MuckcarDetailComponent implements OnInit {
  @Input()
  eventRecord?: EventRecord | null = null;

  @Output() closeEvent = new EventEmitter<boolean>();
  constructor(private _business: MuckcarDetailBusiness) {}

  model?: MuckcarDetailModel;

  async ngOnInit() {
    if (this.eventRecord) {
      this.model = await this._business.init(this.eventRecord);
      console.log(this.model);
    }
  }
  close() {
    this.closeEvent.emit(false);
  }
}
