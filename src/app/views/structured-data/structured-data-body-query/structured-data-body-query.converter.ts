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
    Object.assign(model, source);
    return model;
  }
}
