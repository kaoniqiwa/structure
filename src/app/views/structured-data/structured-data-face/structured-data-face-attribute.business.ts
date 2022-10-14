import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { FaceRecord } from 'src/app/models/face-record.model';
import { PagedList } from 'src/app/models/page-list.model';
import { CommandRequestSerivce } from 'src/app/network/request/commands/commands.service';
import { GetFaceRecordsByAttributeParams } from 'src/app/network/request/commands/params/get-face-records-by-attribute.params';
import { StructuredDataFaceQueryModel } from '../structured-data-face-query/structured-data-face-query.model';
import { StructuredDataItemModel } from '../structured-data-item/structured-data-item.model';
import { StructuredDataFaceConverter } from './structured-data-face.converter';

@Injectable()
export class StructuredDataFaceAttributeBusiness
  implements
    IBusiness<PagedList<FaceRecord>, PagedList<StructuredDataItemModel>>
{
  constructor(private command: CommandRequestSerivce) {}
  Converter = new StructuredDataFaceConverter();
  async load(
    query: StructuredDataFaceQueryModel,
    index: number,
    size: number = 12
  ): Promise<PagedList<StructuredDataItemModel>> {
    let data = await this.getData(query, index, size);
    let model = await this.Converter.Convert(data);
    return model;
  }
  getData(
    query: StructuredDataFaceQueryModel,
    index: number,
    size: number
  ): Promise<PagedList<FaceRecord>> {
    let params = new GetFaceRecordsByAttributeParams();
    params.PageIndex = index;
    params.PageSize = size;
    params.BeginTime = query.duration.begin;
    params.EndTime = query.duration.end;
    params.CameraIds = query.cameraIds;
    if (query.attribute) {
      params.AgeGroup = query.attribute.AgeGroup;
      params.Gender = query.attribute.Gender;
      params.Glass = query.attribute.Glass;
      params.PlateNo = query.attribute.PlateNo;
    }

    return this.command.ai.face.record.query.attribute(params);
  }
}
