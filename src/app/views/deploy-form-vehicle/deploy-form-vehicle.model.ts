import { IBusiness } from 'src/app/interfaces/business.interface';
import { IComponent } from 'src/app/interfaces/component.interfact';
import { VehicleRecord } from 'src/app/models/vehicle-record.model';
import { CreateVehicleDeployControlParams } from 'src/app/network/request/commands/commands.params';
import { DictionaryRequestSerivce } from 'src/app/network/request/dictionaries/dictionaries.service';

export interface IDeployFormVehicleComponent
  extends IComponent<VehicleRecord, CreateVehicleDeployControlParams> {
  business: IDeployFormVehicleBusiness;
}
export interface IDeployFormVehicleBusiness
  extends IBusiness<VehicleRecord, CreateVehicleDeployControlParams> {
  dictionary: DictionaryRequestSerivce;
  create(params: CreateVehicleDeployControlParams): Promise<string>;
}
