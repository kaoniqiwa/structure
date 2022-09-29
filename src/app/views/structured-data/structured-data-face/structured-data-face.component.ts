import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { WindowViewModel } from 'src/app/components/window-control/window.model';
import { EventRecord } from 'src/app/models/event-record/event.record';
import { Page } from 'src/app/models/page-list.model';
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
export class StructuredDataFaceComponent implements OnInit {
  constructor(private business: StructuredDataFaceBusiness) {}
  page?: Page;
  query?: StructuredDataFaceQueryModel;
  datas: StructuredDataItemModel[] = [];
  selected?: EventRecord;
  window: WindowViewModel = new WindowViewModel();
  style = {
    width: 'calc(645px + 40px)',
    height: 'calc(460px + 40px)',
  };
  ngOnInit(): void {}
  pageEvent(page: PageEvent) {
    if (!this.page) {
      this.page = new Page();
    }
    this.page.PageIndex = page.pageIndex + 1;
    this.loadData(this.page.PageIndex);
  }
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
  onselected(item: StructuredDataItemModel) {
    this.selected = item.data;
    this.window.show = true;
  }
  onclosewindow() {
    this.window.show = false;
  }
}
