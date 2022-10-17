import { EventEmitter, Injectable } from '@angular/core';
import {
  IBusiness,
  IRemoveBusiness,
} from 'src/app/interfaces/business.interface';
import { PagedList } from 'src/app/models/page-list.model';
import { VehicleDeployControlTask } from 'src/app/models/vehicle-deploy-control-task.model';
import { CommandRequestSerivce } from 'src/app/network/request/commands/commands.service';
import { GetVehicleDeployControlTasksParams } from 'src/app/network/request/commands/params/get-vehicle-deploy-control-tasks.params';

import { DeployVehicleTableConverter } from './deploy-vehicle-table.converter';
import { DeployVehicleTableModel } from './deploy-vehicle-table.model';

@Injectable()
export class DeployVehicleTableBusiness
  implements
    IRemoveBusiness<
      PagedList<VehicleDeployControlTask>,
      PagedList<DeployVehicleTableModel>
    >
{
  constructor(private service: CommandRequestSerivce) {}

  Converter = new DeployVehicleTableConverter();
  loading?: EventEmitter<void> | undefined;
  async load(
    index: number,
    size: number = 10
  ): Promise<PagedList<DeployVehicleTableModel>> {
    let data = await this.getData(index, size);
    let model = this.Converter.Convert(data);
    return model;
  }
  async getData(
    index: number,
    size: number
  ): Promise<PagedList<VehicleDeployControlTask>> {
    let params = new GetVehicleDeployControlTasksParams();
    params.PageIndex = index;
    params.PageSize = size;
    return this.service.ai.vehicle.deployControl.list(params);
  }
  remove(id: string): Promise<any> {
    return this.service.ai.vehicle.deployControl.delete(id);
  }
}
