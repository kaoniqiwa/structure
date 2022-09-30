import { Injectable } from '@angular/core';
import { BodyRecord } from 'src/app/models/body-record.model';
import { IPromiseConverter } from '../../interfaces/converter.interface';
import { EventRecord } from '../../models/event-record/event.record';
import { FaceEventRecord } from '../../models/event-record/face-event.record';
import { Language } from '../../tools/language';
import { Medium } from '../../tools/medium';
import { BodyDetailModel } from './body-detail.model';

type BodyDetailSource = EventRecord;

@Injectable({
  providedIn: 'root',
})
export class BodyDetailConverter
  implements IPromiseConverter<BodyDetailSource, BodyDetailModel>
{
  Convert(source: BodyDetailSource, ...res: any[]): Promise<BodyDetailModel> {
    if (source instanceof BodyRecord) {
      return this._fromBodyRecord(source);
    }

    throw new Error('Error');
  }
  private async _fromBodyRecord(item: BodyRecord) {
    let model = new BodyDetailModel();
    // model.imageUrl = (await Medium.image(item.ImageUrl)).url;
    // model.backgroundImageUrl = (
    //   await Medium.image(item.Data.BackgroundImageUrl)
    // ).url;
    // model.taskName = item.Data.TaskName ?? '';
    // model.personName = item.Data.PersonName ?? '';
    // model.certificateNumber = item.Data.CertificateNumber ?? '';
    // model.resourceName = item.ResourceName ?? '';
    // model.eventTime = item.EventTime;
    // if (item.Data.RegisterGender) {
    //   model.registerGender = Language.GenderType(item.Data.RegisterGender);
    // }

    return model;
  }
}
