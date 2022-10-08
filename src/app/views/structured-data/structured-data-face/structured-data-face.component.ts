import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { WindowViewModel } from 'src/app/components/window-control/window.model';
import { EventRecord } from 'src/app/models/event-record/event.record';
import { Page } from 'src/app/models/page-list.model';
import { StructuredDataAbstractComponent } from '../structured-data-abstract.component';
import { StructuredDataFaceQueryModel } from '../structured-data-face-query/structured-data-face-query.model';
import { StructuredDataItemModel } from '../structured-data-item/structured-data-item.model';
import { StructuredDataFaceAttributeBusiness } from './structured-data-face-attribute.business';
import { StructuredDataFaceImageBusiness } from './structured-data-face-image.business';
import { StructuredDataFaceBusiness } from './structured-data-face.business';

@Component({
  selector: 'app-structured-data-face',
  templateUrl: './structured-data-face.component.html',
  styleUrls: ['./structured-data-face.component.less'],
  providers: [
    StructuredDataFaceImageBusiness,
    StructuredDataFaceAttributeBusiness,
    StructuredDataFaceBusiness,
  ],
})
export class StructuredDataFaceComponent
  extends StructuredDataAbstractComponent<StructuredDataItemModel>
  implements OnInit
{
  constructor(private business: StructuredDataFaceBusiness) {
    super();
  }
  query?: StructuredDataFaceQueryModel;
  style = {
    width: 'calc(645px + 40px)',
    height: 'calc(460px + 40px)',
  };
  ngOnInit(): void {}

  onquery(query: StructuredDataFaceQueryModel) {
    console.log(query);
    this.query = query;
    this.loadData(1);
  }
  async loadData(index: number) {
    if (this.query) {
      let paged = await this.business.load(this.query, index);
      this.page = paged.Page;
      console.log(paged.Data);
      this.datas = paged.Data;
    }
  }
}
