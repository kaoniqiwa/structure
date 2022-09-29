import { IConverter } from 'src/app/interfaces/converter.interface';
import { BodyModelingResult } from 'src/app/models/body-modeling-result.model';
import { StructuredDataBodyQueryModel } from './structured-data-body-query.model';

export class StructuredDataBodyQueryConverter
  implements IConverter<BodyModelingResult[], StructuredDataBodyQueryModel[]>
{
  item = new StructuredDataBodyQueryItemConverter();
  Convert(
    source: BodyModelingResult[],
    ...res: any[]
  ): StructuredDataBodyQueryModel[] {
    return source.map((x) => {
      return this.item.Convert(x);
    });
  }
}

class StructuredDataBodyQueryItemConverter
  implements IConverter<BodyModelingResult, StructuredDataBodyQueryModel>
{
  Convert(
    source: BodyModelingResult,
    ...res: any[]
  ): StructuredDataBodyQueryModel {
    let model = new StructuredDataBodyQueryModel();
    model.AgeGroup = source.AgeGroup;
    model.Bag = source.Bag;
    model.CyclingType = source.CyclingType;
    model.Gender = source.Gender;
    model.Glass = source.Glass;
    model.HairStyle = source.HairStyle;
    model.Hat = source.Hat;
    model.JacketColor = source.JacketColor;
    model.JacketType = source.JacketType;
    model.Mask = source.Mask;
    model.Ride = source.Ride;
    model.Things = source.Things;
    return model;
  }
}
