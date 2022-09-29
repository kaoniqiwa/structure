import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { FaceRecord } from 'src/app/models/face-record.model';
import { PagedList } from 'src/app/models/page-list.model';
import { StructuredDataFaceQueryModel } from '../structured-data-face-query/structured-data-face-query.model';
import { StructuredDataItemModel } from '../structured-data-item/structured-data-item.model';
import { StructuredDataFaceAttributeBusiness } from './structured-data-face-attribute.business';
import { StructuredDataFaceImageBusiness } from './structured-data-face-image.business';

@Injectable()
export class StructuredDataFaceBusiness
  implements
    IBusiness<PagedList<FaceRecord>, PagedList<StructuredDataItemModel>>
{
  constructor(
    private image: StructuredDataFaceImageBusiness,
    private attribute: StructuredDataFaceAttributeBusiness
  ) {}
  load(
    query: StructuredDataFaceQueryModel,
    index: number,
    size: number = 12
  ): Promise<PagedList<StructuredDataItemModel<any>>> {
    if (query.attribute) {
      return this.attribute.load(query, index, size);
    } else {
      return this.image.load(query, index, size);
    }
  }
  getData(...args: any): Promise<PagedList<FaceRecord>> {
    throw new Error('Method not implemented.');
  }
}
