import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { IConverter } from 'src/app/interfaces/converter.interface';
import { MuckCarEventRecord } from 'src/app/models/event-record/muck-car-event.record';
import { DurationParams } from 'src/app/network/IParams.interface';
import { GetMuckCarEventRecordsParams } from 'src/app/network/request/events/events.params';
import { EventRequestSerivce } from 'src/app/network/request/events/events.service';
import { AlarmConverter } from '../alarm.converter';
import { AlarmModel } from '../alarm.model';

@Injectable()
export class AlarmMuckCarBusiness
  implements IBusiness<MuckCarEventRecord[], AlarmModel[]>
{
  constructor(private service: EventRequestSerivce) {}
  Converter: IConverter<MuckCarEventRecord[], AlarmModel[]> =
    new AlarmConverter();
  loading?: EventEmitter<void> | undefined;
  async load(duration: DurationParams): Promise<AlarmModel[]> {
    let data = await this.getData(duration);
    let model = this.Converter.Convert(data);
    return model;
  }
  async getData(duration: DurationParams): Promise<MuckCarEventRecord[]> {
    let params = new GetMuckCarEventRecordsParams();
    params.BeginTime = duration.BeginTime;
    params.EndTime = duration.EndTime;
    params.PageSize = 10;
    params.Desc = true;
    let paged = await this.service.record.muckCar.list(params);
    return paged.Data;
  }
}
