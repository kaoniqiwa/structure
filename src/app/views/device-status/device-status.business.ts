import { EventEmitter, Injectable } from '@angular/core';
import { OnlineStatus } from 'src/app/enums/online-status.enum';
import { IBusiness } from 'src/app/interfaces/business.interface';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/interfaces/converter.interface';
import { Camera } from 'src/app/models/resource/camera.resource';
import { GetCamerasParams } from 'src/app/network/request/resources/resources.params';
import { ResourceRequestSerivce } from 'src/app/network/request/resources/resources.service';
import { DeviceStatusConverter } from './device-status.converter';
import { DeviceStatusModel } from './device-status.model';

@Injectable()
export class DeviceStatusBusiness
  implements IBusiness<Camera[], DeviceStatusModel>
{
  constructor(private service: ResourceRequestSerivce) {}
  Converter: IConverter<Camera[], DeviceStatusModel> =
    new DeviceStatusConverter();
  loading?: EventEmitter<void> | undefined;
  async load(status?: OnlineStatus): Promise<DeviceStatusModel> {
    let data = await this.getData(status);
    let model = this.Converter.Convert(data);
    return model;
  }
  async getData(status?: OnlineStatus): Promise<Camera[]> {
    let params = new GetCamerasParams();
    params.OnlineStatus = status;
    let paged = await this.service.list(params);
    return paged.Data;
  }
}
