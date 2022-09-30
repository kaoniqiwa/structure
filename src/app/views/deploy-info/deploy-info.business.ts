import { Injectable } from '@angular/core';
import { DeployInfoConverter } from 'src/app/views/deploy-info/deploy-info.converter';
import { EventRecord } from 'src/app/models/event-record/event.record';

@Injectable()
export class DeployInfoBusiness {
  constructor(private _converter: DeployInfoConverter) {}

  async init(data: EventRecord) {
    let res = await this._converter.Convert(data);

    return res;
  }
}
