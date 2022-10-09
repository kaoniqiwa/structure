import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { Duration } from 'src/app/models/duration.model';
import { MuckCarEventRecord } from 'src/app/models/event-record/muck-car-event.record';
import { PagedList } from 'src/app/models/page-list.model';
import { GetMuckCarEventRecordsParams } from 'src/app/network/request/events/events.params';
import { EventRequestSerivce } from 'src/app/network/request/events/events.service';
import { EventRecordMuckCarTableConverter } from './event-record-muckcar-table.converter';
import { EventRecordMuckCarTableModel } from './event-record-muckcar-table.model';

@Injectable()
export class EventRecordMuckCarTableBusiness
  implements
    IBusiness<
      PagedList<MuckCarEventRecord>,
      PagedList<EventRecordMuckCarTableModel>
    >
{
  constructor(private service: EventRequestSerivce) {}
  Converter = new EventRecordMuckCarTableConverter();
  loading?: EventEmitter<void> | undefined;
  async load(
    duration: Duration,
    index: number,
    size: number = 10,
    name?: string
  ): Promise<PagedList<EventRecordMuckCarTableModel>> {
    let data = await this.getData(duration, index, size, name);
    let model = this.Converter.Convert(data);
    return model;
  }
  getData(
    duration: Duration,
    index: number,
    size: number,
    name?: string
  ): Promise<PagedList<MuckCarEventRecord>> {
    let params = new GetMuckCarEventRecordsParams();
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.PageIndex = index;
    params.PageSize = size;
    params.ResourceName = name;
    return this.service.record.muckCar.list(params);
  }
}
