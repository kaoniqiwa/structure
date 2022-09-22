import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/interfaces/business.interface';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/interfaces/converter.interface';
import { VehicleEventRecord } from 'src/app/models/event-record/vehicle-event.record';
import { DurationParams } from 'src/app/network/IParams.interface';
import { GetVehicleEventRecordsParams } from 'src/app/network/request/events/events.params';
import { EventRequestSerivce } from 'src/app/network/request/events/events.service';
import { AlarmConverter } from '../alarm.converter';
import { AlarmModel } from '../alarm.model';

@Injectable()
export class AlarmVehicleBusiness
  implements IBusiness<VehicleEventRecord[], AlarmModel[]>
{
  constructor(private service: EventRequestSerivce) {}
  Converter: IConverter<VehicleEventRecord[], AlarmModel[]> =
    new AlarmConverter();
  loading?: EventEmitter<void> | undefined;
  async load(duration: DurationParams): Promise<AlarmModel[]> {
    let data = await this.getData(duration);
    let model = this.Converter.Convert(data);
    return model;
  }
  async getData(duration: DurationParams): Promise<VehicleEventRecord[]> {
    let params = new GetVehicleEventRecordsParams();
    params.BeginTime = duration.BeginTime;
    params.EndTime = duration.EndTime;
    params.PageSize = 10;
    params.Desc = true;
    let paged = await this.service.record.vehicle.list(params);
    return paged.Data;
  }
}
