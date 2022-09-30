import { Injectable } from '@angular/core';
import { BodyRecord } from 'src/app/models/body-record.model';
import { IPromiseConverter } from '../../interfaces/converter.interface';
import { EventRecord } from '../../models/event-record/event.record';
import { FaceEventRecord } from '../../models/event-record/face-event.record';
import { Language } from '../../tools/language';
import { Medium } from '../../tools/medium';
import { BodyDetailModel } from './body-detail.model';

type BodyDetailSource = BodyRecord;

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
    model.genderName = item.GenderName ?? '未知';
    model.hairStyleName = item.HairStyleName ?? '未知';
    model.ageGroupName = item.AgeGroupName ?? '未知';
    model.jacketTypeName = item.JacketTypeName ?? '未知';
    model.glassName = item.GlassName ?? '未知';
    model.jacketColorName = item.JacketColorName ?? '未知';
    model.bagName = item.BagName ?? '未知';
    model.trousersTypeName = item.TrousersTypeName ?? '未知';
    model.hatName = item.HatName ?? '未知';
    model.trousersColorName = item.TrousersColorName ?? '未知';
    model.maskName = item.MaskName ?? '未知';
    model.rideName = item.RideName ?? '未知';
    model.thingsName = item.ThingsName ?? '未知';
    model.cyclingTypeName = item.CyclingTypeName ?? '未知';
    model.imageUrl = (await Medium.image(item.TargetPictureUrl)).url;
    model.backgroundImageUrl = (await Medium.image(item.BackgroundUrl)).url;

    return model;
  }
}
