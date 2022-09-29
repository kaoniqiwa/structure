import { StructuredDataQueryModel } from '../structured-data.model';

export class StructuredDataBodyQueryModel extends StructuredDataQueryModel {
  AgeGroup?: string;
  Bag?: boolean;
  CyclingType?: string;
  Gender?: string;
  Glass?: boolean;
  HairStyle?: string;
  Hat?: boolean;
  JacketType?: string;
  TrousersType?: string;
  JacketColor?: string;
  TrousersColor?: string;
  Ride?: boolean;

  Mask?: boolean;
  Things?: boolean;
}
