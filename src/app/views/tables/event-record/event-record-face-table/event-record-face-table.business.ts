import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/interfaces/business.interface';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/interfaces/converter.interface';
import { Duration } from 'src/app/models/duration.model';
import { FaceEventRecord } from 'src/app/models/event-record/face-event.record';
import { PagedList } from 'src/app/models/page-list.model';
import { GetFaceEventRecordsParams } from 'src/app/network/request/events/events.params';
import { EventRequestSerivce } from 'src/app/network/request/events/events.service';
import { EventRecordFaceTableConverter } from './event-record-face-table.converter';
import {
  EventRecordFaceTableArgs,
  EventRecordFaceTableModel,
} from './event-record-face-table.model';

@Injectable()
export class EventRecordFaceTableBusiness
  implements
    IBusiness<PagedList<FaceEventRecord>, PagedList<EventRecordFaceTableModel>>
{
  constructor(private service: EventRequestSerivce) {}
  Converter = new EventRecordFaceTableConverter();
  loading?: EventEmitter<void> | undefined;
  async load(
    args: EventRecordFaceTableArgs
  ): Promise<PagedList<EventRecordFaceTableModel>> {
    let data = await this.getData(
      args.duration,
      args.page.PageIndex,
      args.page.PageSize,
      args.cameraIds,
      args.name
    );
    let model = this.Converter.Convert(data);
    return model;
  }
  getData(
    duration: Duration,
    index: number,
    size: number,
    cameraIds?: string[],
    name?: string
  ): Promise<PagedList<FaceEventRecord>> {
    let params = new GetFaceEventRecordsParams();
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.PageIndex = index;
    params.PageSize = size;
    params.ResourceName = name;
    params.ResourceIds = cameraIds;
    return this.service.record.face.list(params);
  }
}
