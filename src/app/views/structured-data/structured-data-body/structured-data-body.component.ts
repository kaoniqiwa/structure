import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Page } from 'src/app/models/page-list.model';
import { StructuredDataBodyQueryModel } from '../structured-data-body-query/structured-data-body-query.model';
import { StructuredDataBodyBusiness } from './structured-data-body.business';

@Component({
  selector: 'app-structured-data-body',
  templateUrl: './structured-data-body.component.html',
  styleUrls: ['./structured-data-body.component.less'],
  providers: [StructuredDataBodyBusiness],
})
export class StructuredDataBodyComponent implements OnInit {
  constructor(private business: StructuredDataBodyBusiness) {}
  page?: Page;
  query?: StructuredDataBodyQueryModel;
  datas: any[] = [];
  ngOnInit(): void {}
  pageEvent(page: PageEvent) {
    if (!this.page) {
      this.page = new Page();
    }
    this.page.PageIndex = page.pageIndex + 1;
    this.loadData(this.page.PageIndex);
  }
  onquery(query: StructuredDataBodyQueryModel) {
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
