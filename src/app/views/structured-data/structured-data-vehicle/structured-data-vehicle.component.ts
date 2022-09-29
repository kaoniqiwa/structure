import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { WindowViewModel } from 'src/app/components/window-control/window.model';
import { EventRecord } from 'src/app/models/event-record/event.record';
import { Page } from 'src/app/models/page-list.model';
import { VehicleRecord } from 'src/app/models/vehicle-record.model';
import { StructuredDataItemModel } from '../structured-data-item/structured-data-item.model';
import { StructuredDataVehicleQueryModel } from '../structured-data-vehicle-query/structured-data-vehicle-query.model';
import { StructuredDataVehicleBusiness } from './structured-data-vehicle.business';

@Component({
  selector: 'app-structured-data-vehicle',
  templateUrl: './structured-data-vehicle.component.html',
  styleUrls: ['./structured-data-vehicle.component.less'],
  providers: [StructuredDataVehicleBusiness],
})
export class StructuredDataVehicleComponent implements OnInit {
  constructor(private business: StructuredDataVehicleBusiness) {}
  page?: Page;
  query?: StructuredDataVehicleQueryModel;
  datas: StructuredDataItemModel[] = [];
  selected?: EventRecord;
  window: WindowViewModel = new WindowViewModel();
  style = {
    width: 'calc(815px + 40px)',
    height: 'calc(465px + 40px)',
  };
  ngOnInit(): void {}

  pageEvent(page: PageEvent) {
    if (!this.page) {
      this.page = new Page();
    }
    this.page.PageIndex = page.pageIndex + 1;
    this.loadData(this.page.PageIndex);
  }

  onquery(query: StructuredDataVehicleQueryModel) {
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
