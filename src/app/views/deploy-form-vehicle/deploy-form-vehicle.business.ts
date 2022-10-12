import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/interfaces/business.interface';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/interfaces/converter.interface';
import { IModel } from 'src/app/models/model.interface';
import { VehicleRecord } from 'src/app/models/vehicle-record.model';
import { CreateVehicleDeployControlParams } from 'src/app/network/request/commands/commands.params';
import { CommandRequestSerivce } from 'src/app/network/request/commands/commands.service';
import { DictionaryRequestSerivce } from 'src/app/network/request/dictionaries/dictionaries.service';
import { DateTimeTool } from 'src/app/tools/datetime.tool';
import { Medium } from 'src/app/tools/medium';
import { DeployFormVehicleConverter } from './deploy-form-vehicle.converter';
import { IDeployFormVehicleBusiness } from './deploy-form-vehicle.model';

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
