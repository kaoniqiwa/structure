import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/interfaces/business.interface';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/interfaces/converter.interface';
import { VehicleModelingResult } from 'src/app/models/vehicle-modeling-result.model';
import { VehicleImageModelingParams } from 'src/app/network/request/commands/commands.params';
import { CommandRequestSerivce } from 'src/app/network/request/commands/commands.service';
import { DictionaryRequestSerivce } from 'src/app/network/request/dictionaries/dictionaries.service';
import { StructuredDataVehicleQueryConverter } from './structured-data-vehicle-query.converter';
import { StructuredDataVehicleQueryModel } from './structured-data-vehicle-query.model';

@Injectable()
export class StructuredDataVehicleQueryBusiness
  implements
    IBusiness<VehicleModelingResult[], StructuredDataVehicleQueryModel[]>
{
  constructor(
    private command: CommandRequestSerivce,
    private dictionary: DictionaryRequestSerivce
  ) {}
  Converter: IConverter<
    VehicleModelingResult[],
    StructuredDataVehicleQueryModel[]
  > = new StructuredDataVehicleQueryConverter();
  loading?: EventEmitter<void> | undefined;
  async load(img: string): Promise<StructuredDataVehicleQueryModel[]> {
    let data = await this.getData(img);
    let model = this.Converter.Convert(data);
    return model;
  }
  getData(img: string): Promise<VehicleModelingResult[]> {
    let params = new VehicleImageModelingParams();
    params.ImageData = img;
    return this.command.ai.vehicle.modeling(params);
  }

  plateColor() {
    return this.dictionary.vehicle.PlateColor();
  }
  plateType() {
    return this.dictionary.vehicle.PlateType();
  }
  plateState() {
    return this.dictionary.vehicle.PlateState();
  }
  vehicleType() {
    return this.dictionary.vehicle.VehicleType();
  }
  vehicleColor() {
    return this.dictionary.vehicle.VehicleColor();
  }
  vehicleColorDepth() {
    return this.dictionary.vehicle.VehicleColorDepth();
  }
}
