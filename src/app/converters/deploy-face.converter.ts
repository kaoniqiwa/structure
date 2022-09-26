import { Injectable } from '@angular/core';
import { mode } from 'crypto-js';
import { Gender } from '../enums/gender.enum';
import {
  IConverter,
  IPromiseConverter,
} from '../interfaces/converter.interface';
import { EventRecord } from '../models/event-record/event.record';
import { FaceEventRecord } from '../models/event-record/face-event.record';
import { MuckCarEventRecord } from '../models/event-record/muck-car-event.record';
import { VehicleEventRecord } from '../models/event-record/vehicle-event.record';
import { Language } from '../tools/language';
import { Medium } from '../tools/medium';
import { DeployFaceModel } from '../views/deploy-face/deploy-face.model';

type DeployFaceSource = EventRecord;

@Injectable({
  providedIn: 'root',
})
export class DeployFaceConverter
  implements IPromiseConverter<DeployFaceSource, DeployFaceModel>
{
  constructor() {}
  Convert(source: DeployFaceSource, ...res: any[]): Promise<DeployFaceModel> {
    if (source instanceof FaceEventRecord) {
      return this._fromFaceEventRecord(source);
    } else if (source instanceof VehicleEventRecord) {
    } else if (source instanceof MuckCarEventRecord) {
    }
    throw new Error('Error');
  }

  private async _fromFaceEventRecord(item: FaceEventRecord) {
    let model = new DeployFaceModel();
    model.imageUrl = (await Medium.image(item.ImageUrl)).url;
    model.title = item.EventDescription ?? '';
    model.content = [];
    item.Data.PersonName && model.content.push(item.Data.PersonName);
    item.Data.RegisterGender &&
      model.content.push(Language.GenderType(item.Data.RegisterGender));
    model.eventTime = item.EventTime;

    return model;
  }
}
