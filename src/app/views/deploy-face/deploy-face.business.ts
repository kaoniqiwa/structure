import { Injectable } from '@angular/core';
import { DeployFaceConverter } from 'src/app/converters/deploy-face.converter';
import { EventRecord } from 'src/app/models/event-record/event.record';

@Injectable()
export class DeployFaceBusiness {
  constructor(private _converter: DeployFaceConverter) {}

  async init(data: EventRecord) {
    let res = await this._converter.Convert(data);

    return res;
  }
}
