import { Injectable } from '@angular/core';
import { MuckCarDetailModel } from './muckcar-detail.model';
import { IPromiseConverter } from '../../interfaces/converter.interface';
import { EventRecord } from '../../models/event-record/event.record';
import { FaceEventRecord } from '../../models/event-record/face-event.record';
import { MuckCarEventRecord } from '../../models/event-record/muck-car-event.record';
import { Language } from '../../tools/language';
import { Medium } from '../../tools/medium';

type MuckCarDetailSource = EventRecord;

@Injectable({
  providedIn: 'root',
})
export class MuckCarDetailConverter
  implements IPromiseConverter<MuckCarDetailSource, MuckCarDetailModel>
{
  Convert(
    source: MuckCarDetailSource,
    ...res: any[]
  ): Promise<MuckCarDetailModel> {
    if (source instanceof MuckCarEventRecord) {
      return this._fromMuckCarEventRecord(source);
    }

    throw new Error('Error');
  }
  private async _fromMuckCarEventRecord(item: MuckCarEventRecord) {
    let model = new MuckCarDetailModel();
    model.imageUrl = (await Medium.image(item.ImageUrl)).url;
    model.backgroundImageUrl = (
      await Medium.image(item.Data.BackgroundImageUrl)
    ).url;
    model.plateNo = item.Data.PlateNo ?? '';
    model.plateColor = item.Data.PlateColor ?? '';
    model.vehicleColor = item.Data.VehicleColor ?? '';
    return model;
  }
}
