import { EventEmitter, Injectable } from '@angular/core';
import { OnlineStatus } from 'src/app/enums/online-status.enum';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { Camera } from 'src/app/models/resource/camera.resource';
import { RegionRequestSerivce } from 'src/app/network/request/regions/regions.service';
import { GetCamerasParams } from 'src/app/network/request/resources/resources.params';
import { ResourceRequestSerivce } from 'src/app/network/request/resources/resources.service';
import { DeviceTableConverter } from './device-table.converter';
import { DeviceTableModel } from './device-table.model';

@Injectable()
export class DeviceTableBusiness
  implements IBusiness<Camera[], DeviceTableModel[]>
{
  constructor(
    private service: ResourceRequestSerivce,
    private region: RegionRequestSerivce
  ) {}
  Converter = new DeviceTableConverter();
  loading?: EventEmitter<void> | undefined;
  async load(status?: OnlineStatus): Promise<DeviceTableModel[]> {
    let data = await this.getData(status);
    let nodes = await this.getNodes();
    let model = this.Converter.Convert(data, {
      node: (id: string) => {
        return nodes.find((x) => x.ResourceId === id);
      },
    });
    return model;
  }

  getNodes() {
    return this.region.node.all();
  }

  async getData(status?: OnlineStatus): Promise<Camera[]> {
    let params = new GetCamerasParams();
    params.OnlineStatus = status;
    let paged = await this.service.list(params);
    return paged.Data;
  }
}
