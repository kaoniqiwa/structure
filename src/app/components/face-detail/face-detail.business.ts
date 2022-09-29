import { Injectable } from '@angular/core';
import { FaceDetailConverter } from 'src/app/converters/face-detail.converter';
import { EventRecord } from 'src/app/models/event-record/event.record';

@Injectable()
export class FaceDetailBusiness {
  constructor(private _converter: FaceDetailConverter) {}

  async init(data: EventRecord) {
    let res = await this._converter.Convert(data);

    return res;
  }
}
