import { Injectable } from '@angular/core';
import { MuckcarDetailModel } from '../components/muckcar-detail/muckcar-detail.model';
import { IPromiseConverter } from '../interfaces/converter.interface';
import { EventRecord } from '../models/event-record/event.record';
import { FaceEventRecord } from '../models/event-record/face-event.record';
import { MuckCarEventRecord } from '../models/event-record/muck-car-event.record';
import { Language } from '../tools/language';
import { Medium } from '../tools/medium';

type MuckcarDetailSource = EventRecord;

@Injectable({
  providedIn: 'root',
})
export class MuckcarDetailConverter
  implements IPromiseConverter<MuckcarDetailSource, MuckcarDetailModel>
{
  Convert(
    source: MuckcarDetailSource,
    ...res: any[]
  ): Promise<MuckcarDetailModel> {
    if (source instanceof MuckCarEventRecord) {
      return this._fromMuckcarEventRecord(source);
    }

    throw new Error('Error');
  }
  private async _fromMuckcarEventRecord(item: MuckCarEventRecord) {
    let model = new MuckcarDetailModel();
    model.imageUrl = (await Medium.image(item.ImageUrl)).url;
    model.backgroundImageUrl = (
      await Medium.image(item.Data.BackgroundImageUrl)
    ).url;
    model.plateNo = item.Data.PlateNo;
    model.plateColor = item.Data.PlateColor;
    model.vehicleColor = item.Data.VehicleColor;
    return model;
  }
}
