import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { PagedList } from 'src/app/models/page-list.model';
import { VehicleRecord } from 'src/app/models/vehicle-record.model';
import { CommandRequestSerivce } from 'src/app/network/request/commands/commands.service';
import { GetVehicleRecordsByAttributeParams } from 'src/app/network/request/commands/params/get-vehicle-records-by-attribute.params';
import { StructuredDataItemModel } from '../structured-data-item/structured-data-item.model';
import { StructuredDataVehicleQueryModel } from '../structured-data-vehicle-query/structured-data-vehicle-query.model';
import { StructuredDataVehicleConverter } from './structured-data-vehicle.converter';

@Injectable()
export class StructuredDataVehicleBusiness
  implements
    IBusiness<PagedList<VehicleRecord>, PagedList<StructuredDataItemModel>>
{
  constructor(private command: CommandRequestSerivce) {}
  Converter = new StructuredDataVehicleConverter();
  async load(
    query: StructuredDataVehicleQueryModel,
    index: number,
    size: number = 12
  ): Promise<PagedList<StructuredDataItemModel>> {
    let data = await this.getData(query, index, size);
    let model = await this.Converter.Convert(data);
    return model;
  }
  getData(
    query: StructuredDataVehicleQueryModel,
    index: number,
    size: number
  ): Promise<PagedList<VehicleRecord>> {
    let params = new GetVehicleRecordsByAttributeParams();
    params.PageIndex = index;
    params.PageSize = size;
    params.BeginTime = query.duration.begin;
    params.EndTime = query.duration.end;
    params.CameraIds = query.cameraIds;
    params.PlateColor = query.PlateColor;
    params.PlateNo = query.PlateNo;
    params.PlateState = query.PlateState;
    params.PlateType = query.PlateType;
    params.VehicleColor = query.VehicleColor;
    params.VehicleColorDepth = query.VehicleColorDepth;
    params.VehicleSpeed = query.VehicleSpeed;
    params.VehicleType = query.VehicleType;
    return this.command.ai.vehicle.record.attribute(params);
  }
}
