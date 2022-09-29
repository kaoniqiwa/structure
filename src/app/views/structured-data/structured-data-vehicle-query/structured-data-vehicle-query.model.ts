import { StructuredDataQueryModel } from '../structured-data.model';

export class StructuredDataVehicleQueryModel extends StructuredDataQueryModel {
  PlateNo?: string;
  PlateColor?: string;
  PlateType?: string;
  PlateState?: string;
  VehicleType?: string;
  VehicleColor?: string;
  VehicleColorDepth?: string;
  VehicleSpeed?: string;
  // VehicleLogo	?:string
}
