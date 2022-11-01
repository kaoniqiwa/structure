import { Injectable } from '@angular/core';
import { mode } from 'crypto-js';
import { Gender } from '../../enums/gender.enum';
import {
  IConverter,
  IPromiseConverter,
} from '../../interfaces/converter.interface';
import { EventRecord } from '../../models/event-record/event.record';
import { FaceEventRecord } from '../../models/event-record/face-event.record';
import { MuckCarEventRecord } from '../../models/event-record/muck-car-event.record';
import { VehicleEventRecord } from '../../models/event-record/vehicle-event.record';
import { Language } from '../../tools/language';
import { Medium } from '../../tools/medium';
import { DeployInfoModel } from './deploy-info.model';

type DeployInfoSource = EventRecord;

@Injectable({
  providedIn: 'root',
})
export class DeployInfoConverter
  implements IPromiseConverter<DeployInfoSource, DeployInfoModel>
{
  constructor() {}
  Convert(source: DeployInfoSource, ...res: any[]): Promise<DeployInfoModel> {
    if (source instanceof FaceEventRecord) {
      return this._fromFaceEventRecord(source);
    } else if (source instanceof VehicleEventRecord) {
      return this._fromVehicleEventRecord(source);
    } else if (source instanceof MuckCarEventRecord) {
      return this._fromMuckCarEventRecord(source);
    }
    throw new Error('Error');
  }

  private async _fromFaceEventRecord(item: FaceEventRecord) {
    let model = new DeployInfoModel();
    model.imageUrl = (await Medium.image(item.ImageUrl)).url;
    model.title = item.EventDescription ?? '';
    model.content = [];
    item.Data.PersonName && model.content.push(item.Data.PersonName);
    item.Data.RegisterGenderName &&
      model.content.push(item.Data.RegisterGenderName);
    model.eventTime = item.EventTime;

    return model;
  }
  private async _fromVehicleEventRecord(item: VehicleEventRecord) {
    let model = new DeployInfoModel();
    model.imageUrl = (await Medium.image(item.ImageUrl)).url;
    model.title = item.EventDescription ?? '';
    model.content = [];
    item.Data.CrossingName && model.content.push(item.Data.CrossingName);
    item.Data.PlateNo && model.content.push(item.Data.PlateNo);
    item.Data.TaskName && model.content.push(item.Data.TaskName);

    model.eventTime = item.EventTime;

    return model;
  }
  private async _fromMuckCarEventRecord(item: MuckCarEventRecord) {
    let model = new DeployInfoModel();
    model.imageUrl = (await Medium.image(item.ImageUrl)).url;
    model.title = item.EventDescription ?? '';
    model.content = [];
    item.Data.CrossingName && model.content.push(item.Data.CrossingName);
    item.Data.PlateNo && model.content.push(item.Data.PlateNo);
    item.Data.IntelligentTypeName &&
      model.content.push(item.Data.IntelligentTypeName);
    model.eventTime = item.EventTime;

    return model;
  }
}
