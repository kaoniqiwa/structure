import { Injectable } from '@angular/core';
import { EventRecord } from 'src/app/models/event-record/event.record';
import { IModel } from 'src/app/models/model.interface';
import { CommonDetailConverter } from './common-detail.converter';

@Injectable()
export class CommonDetailBusiness {
  constructor(private _converter: CommonDetailConverter) {}

  init(data: IModel) {
    let res = this._converter.Convert(data);
    return res;
  }
}
