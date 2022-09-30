import { IConverter } from 'src/app/interfaces/converter.interface';
import { VehicleModelingResult } from 'src/app/models/vehicle-modeling-result.model';
import { StructuredDataVehicleQueryModel } from './structured-data-vehicle-query.model';

export class StructuredDataVehicleQueryConverter
  implements
    IConverter<VehicleModelingResult[], StructuredDataVehicleQueryModel[]>
{
  item = new StructuredDataVehicleQueryItemConverter();
  Convert(
    source: VehicleModelingResult[],
    ...res: any[]
  ): StructuredDataVehicleQueryModel[] {
    return source.map((x) => {
      return this.item.Convert(x);
    });
  }
}

class StructuredDataVehicleQueryItemConverter
  implements IConverter<VehicleModelingResult, StructuredDataVehicleQueryModel>
{
  Convert(
    source: VehicleModelingResult,
    ...res: any[]
  ): StructuredDataVehicleQueryModel {
    let model = new StructuredDataVehicleQueryModel();
    Object.assign(model, source);
    return model;
  }
}
