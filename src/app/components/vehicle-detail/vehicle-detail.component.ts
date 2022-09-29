import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventRecord } from 'src/app/models/event-record/event.record';
import { VehicleRecord } from 'src/app/models/vehicle-record.model';
import { VehicleDetailBusiness } from './vehicle-detail.business';
import { VehicleDetailModel } from './vehicle-detail.model';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.less'],
  providers: [VehicleDetailBusiness],
})
export class VehicleDetailComponent implements OnInit {
  @Input()
  eventRecord?: EventRecord;

  @Output() closeEvent = new EventEmitter<boolean>();

  model?: VehicleDetailModel;

  constructor(private _business: VehicleDetailBusiness) {}

  async ngOnInit() {
    if (this.eventRecord) {
      this.model = await this._business.init(this.eventRecord);
    }
  }
  close() {
    this.closeEvent.emit(false);
  }
}
