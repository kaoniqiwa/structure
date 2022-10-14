import { Injectable } from '@angular/core';
import { VehicleRecord } from 'src/app/models/vehicle-record.model';
import { CommandRequestSerivce } from 'src/app/network/request/commands/commands.service';
import { CreateVehicleDeployControlParams } from 'src/app/network/request/commands/params/create-vehicle-deploy-control.params';
import { DictionaryRequestSerivce } from 'src/app/network/request/dictionaries/dictionaries.service';
import { DeployFormVehicleConverter } from '../deploy-form-vehicle.converter';
import { IDeployFormVehicleBusiness } from '../deploy-form-vehicle.model';

@Injectable()
export class DeployFormVehicleBusiness implements IDeployFormVehicleBusiness {
  constructor(
    private command: CommandRequestSerivce,
    public dictionary: DictionaryRequestSerivce
  ) {}
  Converter = new DeployFormVehicleConverter();
  async load(record: VehicleRecord): Promise<CreateVehicleDeployControlParams> {
    return this.Converter.Convert(record);
  }
  getData(...args: any): Promise<VehicleRecord> {
    throw new Error('Method not implemented.');
  }

  create(params: CreateVehicleDeployControlParams) {
    return this.command.ai.vehicle.deployControl.create(params);
  }
}
