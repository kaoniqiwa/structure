import { Injectable } from '@angular/core';
import { VehicleDetailConverter } from 'src/app/components/vehicle-detail/vehicle-detail.converter';
import { EventRecord } from 'src/app/models/event-record/event.record';

@Injectable()
export class VehicleDetailBusiness {
  constructor(private _converter: VehicleDetailConverter) {}

  async init(data: EventRecord) {
    let res = await this._converter.Convert(data);
    return res;
  }
}
