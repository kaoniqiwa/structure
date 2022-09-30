import { Injectable } from '@angular/core';
import { FaceDetailConverter } from 'src/app/components/face-detail/face-detail.converter';
import { BodyRecord } from 'src/app/models/body-record.model';
import { EventRecord } from 'src/app/models/event-record/event.record';
import { BodyDetailConverter } from './body-detail.converter';

@Injectable()
export class BodyDetailBusiness {
  constructor(private _converter: BodyDetailConverter) {}

  async init(data: BodyRecord) {
    let res = await this._converter.Convert(data);

    return res;
  }
}
