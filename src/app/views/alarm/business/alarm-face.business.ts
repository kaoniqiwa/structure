import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/interfaces/business.interface';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/interfaces/converter.interface';
import { FaceEventRecord } from 'src/app/models/event-record/face-event.record';
import { DurationParams } from 'src/app/network/IParams.interface';
import { GetFaceEventRecordsParams } from 'src/app/network/request/events/events.params';
import { EventRequestSerivce } from 'src/app/network/request/events/events.service';
import { AlarmConverter } from '../alarm.converter';
import { AlarmModel } from '../alarm.model';

@Injectable()
export class AlarmFaceBusiness
  implements IBusiness<FaceEventRecord[], AlarmModel[]>
{
  constructor(private service: EventRequestSerivce) {}
  Converter: IConverter<FaceEventRecord[], AlarmModel[]> = new AlarmConverter();
  loading?: EventEmitter<void> | undefined;
  async load(duration: DurationParams): Promise<AlarmModel[]> {
    let data = await this.getData(duration);
    let model = this.Converter.Convert(data);
    return model;
  }
  async getData(duration: DurationParams): Promise<FaceEventRecord[]> {
    let params = new GetFaceEventRecordsParams();
    params.BeginTime = duration.BeginTime;
    params.EndTime = duration.EndTime;
    params.PageSize = 10;
    params.Desc = true;
    let paged = await this.service.record.face.list(params);
    return paged.Data;
  }
}
