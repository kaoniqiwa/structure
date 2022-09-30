import { Injectable } from '@angular/core';
import { MuckcarDetailConverter } from 'src/app/components/muckcar-detail/muckcar-detail.converter';
import { EventRecord } from 'src/app/models/event-record/event.record';

@Injectable()
export class MuckcarDetailBusiness {
  constructor(private _converter: MuckcarDetailConverter) {}

  async init(data: EventRecord) {
    let res = await this._converter.Convert(data);
    return res;
  }
}
