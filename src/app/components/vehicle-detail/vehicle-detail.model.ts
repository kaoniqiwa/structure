import {
  Transform,
  TransformationType,
  TransformFnParams,
} from 'class-transformer';
import { VehicleRecord } from 'src/app/models/vehicle-record.model';

export class VehicleDetailModel {
  plateNo!: string;
  vehicleColor!: string;
  plateColor!: string;
  vehicleColorDepth!: string;
  plateType!: string;
  plateTypeName!: string;
  plateNoSuffix!: string;
  vehicleLogoName!: string;
  plateProvince!: string;
  vehicleSubLogoName!: string;
  plateStatus!: string;
  vehicleSpeed!: string;
  pilotSafebelt!: string;
  usePhone!: string;
  imageUrl!: string;
  backgroundImageUrl!: string;
}
