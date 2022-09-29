import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { BodyRecord } from 'src/app/models/body-record.model';
import { PagedList } from 'src/app/models/page-list.model';
import { GetBodyRecordsByAttributeParams } from 'src/app/network/request/commands/commands.params';
import { CommandRequestSerivce } from 'src/app/network/request/commands/commands.service';
import { StructuredDataBodyQueryModel } from '../structured-data-body-query/structured-data-body-query.model';
import { StructuredDataItemModel } from '../structured-data-item/structured-data-item.model';
import { StructuredDataBodyConverter } from './structured-data-body.converter';

@Injectable()
export class StructuredDataBodyBusiness
  implements
    IBusiness<PagedList<BodyRecord>, PagedList<StructuredDataItemModel>>
{
  constructor(private command: CommandRequestSerivce) {}
  Converter = new StructuredDataBodyConverter();
  async load(
    query: StructuredDataBodyQueryModel,
    index: number,
    size: number = 12
  ): Promise<PagedList<StructuredDataItemModel>> {
    let data = await this.getData(query, index, size);
    let model = await this.Converter.Convert(data);
    return model;
  }
  getData(
    query: StructuredDataBodyQueryModel,
    index: number,
    size: number
  ): Promise<PagedList<BodyRecord>> {
    let params = new GetBodyRecordsByAttributeParams();
    params.PageIndex = index;
    params.PageSize = size;
    params.BeginTime = query.duration.begin;
    params.EndTime = query.duration.end;
    params.CameraIds = query.cameraIds;
    params.AgeGroup = query.AgeGroup;
    params.Bag = query.Bag;
    params.CyclingType = query.CyclingType;
    params.Gender = query.Gender;
    params.Glass = query.Glass;
    params.HairStyle = query.HairStyle;
    params.Hat = query.Hat;
    params.JacketColor = query.JacketColor;
    params.JacketType = query.JacketType;
    params.Mask = query.Mask;
    params.Ride = query.Ride;
    params.Things = query.Things;
    params.TrousersColor = query.TrousersColor;
    params.TrousersType = query.TrousersType;

    return this.command.ai.body.record.attribute(params);
  }
}
