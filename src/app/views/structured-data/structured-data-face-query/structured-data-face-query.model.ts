import { Gender } from 'src/app/enums/gender.enum';
import { Duration } from 'src/app/models/duration.model';
import { StructuredDataQueryModel } from '../structured-data.model';

export enum StructuredDataFaceQueryTab {
  image,
  attribute,
}

export class StructuredDataFaceQueryModel extends StructuredDataQueryModel {
  image?: StructuredDataFaceQueryByImageModel;
  attribute?: StructuredDataFaceQueryByAttributeModel;
}

export class StructuredDataFaceQueryByImageModel {
  image?: string;
  similarity: number = 50;
}

export class StructuredDataFaceQueryByAttributeModel {
  Gender?: string;
  AgeGroup?: string;
  Glass?: boolean;
  PlateNo?: string;
}
