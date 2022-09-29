import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Page } from 'src/app/models/page-list.model';
import { StructuredDataFaceQueryModel } from '../structured-data-face-query/structured-data-face-query.model';
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
  datas: any[] = [];
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
}
