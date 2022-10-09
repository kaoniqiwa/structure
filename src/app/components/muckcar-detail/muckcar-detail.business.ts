import { Injectable } from '@angular/core';
import { MuckCarDetailConverter } from 'src/app/components/muckcar-detail/muckcar-detail.converter';
import { EventRecord } from 'src/app/models/event-record/event.record';

@Injectable()
export class MuckCarDetailBusiness {
  constructor(private _converter: MuckCarDetailConverter) {}

  async init(data: EventRecord) {
    let res = await this._converter.Convert(data);
    return res;
  }
}
