import { Injectable } from '@angular/core';
import { VehicleDetailModel } from '../components/vehicle-detail/vehicle-detail.model';
import { IPromiseConverter } from '../interfaces/converter.interface';
import { EventRecord } from '../models/event-record/event.record';
import { VehicleEventRecord } from '../models/event-record/vehicle-event.record';
import { Medium } from '../tools/medium';

type VehicleDetailSource = EventRecord;

@Injectable({
  providedIn: 'root',
})
export class VehicleDetailConverter
  implements IPromiseConverter<VehicleDetailSource, VehicleDetailModel>
{
  Convert(
    source: VehicleDetailSource,
    ...res: any[]
  ): Promise<VehicleDetailModel> {
    if (source instanceof VehicleEventRecord) {
      return this._fromVehicleEventRecord(source);
    }

    throw new Error('Error');
  }
  private async _fromVehicleEventRecord(item: VehicleEventRecord) {
    let model = new VehicleDetailModel();
    model.imageUrl = (await Medium.image(item.ImageUrl)).url;
    model.backgroundImageUrl = (await Medium.image(item.ImageUrl)).url;
    model.plateNo = item.Data.PlateNo ?? '';
    model.vehicleColor = item.Data.VehicleColor ?? '';
    model.vehicleColorDepth = item.Data.VehicleColorDepth ?? '';
    model.plateType = item.Data.PlateType ?? '';
    model.plateTypeName = item.Data.PlateTypeName ?? '';
    model.plateNoSuffix = item.Data.PlateNo
      ? item.Data.PlateNo.split('').pop()!
      : '';
    model.vehicleLogoName = item.Data.VehicleLogoName ?? '';
    model.plateProvince = item.Data.PlateNo
      ? item.Data.PlateNo.split('').shift()!
      : '';
    model.vehicleSubLogoName = item.Data.VehicleSubLogoName ?? '';
    model.plateStatus = '';
    model.vehicleSpeed = item.Data.VehicleSpeed?.toString() ?? '';
    model.pilotSafebelt = item.Data.PilotSafebelt ? '是' : '否';
    model.usePhone = item.Data.UsePhone ? '是' : '否';

    return model;
  }
}
