import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { Duration } from 'src/app/models/duration.model';
import { PagedList } from 'src/app/models/page-list.model';
import { VehicleDeployControlTask } from 'src/app/models/vehicle-deploy-control-task.model';
import { GetVehicleDeployControlTasksParams } from 'src/app/network/request/commands/commands.params';
import { CommandRequestSerivce } from 'src/app/network/request/commands/commands.service';
import { DeployVehicleTableConverter } from './deploy-vehicle-table.converter';
import { DeployVehicleTableModel } from './deploy-vehicle-table.model';

@Injectable()
export class DeployVehicleTableBusiness
  implements
    IBusiness<
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
  getData(
    index: number,
    size: number
  ): Promise<PagedList<VehicleDeployControlTask>> {
    let params = new GetVehicleDeployControlTasksParams();
    params.PageIndex = index;
    params.PageSize = size;
    return this.service.ai.vehicle.deployControl.list(params);
  }
}
