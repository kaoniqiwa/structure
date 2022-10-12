import { Injectable } from '@angular/core';
import { FaceDetailModel } from './face-detail.model';
import { IPromiseConverter } from '../../interfaces/converter.interface';
import { EventRecord } from '../../models/event-record/event.record';
import { FaceEventRecord } from '../../models/event-record/face-event.record';
import { Language } from '../../tools/language';
import { Medium } from '../../tools/medium';

type FaceDetailSource = EventRecord;

@Injectable({
  providedIn: 'root',
})
export class FaceDetailConverter
  implements IPromiseConverter<FaceDetailSource, FaceDetailModel>
{
  Convert(source: FaceDetailSource, ...res: any[]): Promise<FaceDetailModel> {
    if (source instanceof FaceEventRecord) {
      return this._fromFaceEventRecord(source);
    }

    throw new Error('Error');
  }
  private async _fromFaceEventRecord(item: FaceEventRecord) {
    let model = new FaceDetailModel();
    model.imageUrl = (await Medium.image(item.ImageUrl)).url;
    model.backgroundImageUrl = (
      await Medium.image(item.Data.BackgroundImageUrl)
    ).url;
    model.taskName = item.Data.TaskName ?? '';
    model.personName = item.Data.PersonName ?? '';
    model.certificateNumber = item.Data.CertificateNumber ?? '';
    model.resourceName = item.ResourceName ?? '';
    model.eventTime = item.EventTime;
    if (item.Data.RegisterGender) {
      model.registerGender = item.Data.RegisterGender;
    }

    return model;
  }
}
