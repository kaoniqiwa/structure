import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { WindowViewModel } from 'src/app/components/window-control/window.model';
import { PictureArgs } from 'src/app/models/args/picture.args';
import { EventRecord } from 'src/app/models/event-record/event.record';
import { Page } from 'src/app/models/page-list.model';
import { VehicleRecord } from 'src/app/models/vehicle-record.model';
import { StructuredDataAbstractComponent } from '../structured-data-abstract.component';
import {
  StructuredDataItemImageArgs,
  StructuredDataItemModel,
} from '../structured-data-item/structured-data-item.model';
import { StructuredDataVehicleQueryModel } from '../structured-data-vehicle-query/structured-data-vehicle-query.model';
import { StructuredDataVehicleBusiness } from './structured-data-vehicle.business';

@Component({
  selector: 'app-structured-data-vehicle',
  templateUrl: './structured-data-vehicle.component.html',
  styleUrls: ['./structured-data-vehicle.component.less'],
  providers: [StructuredDataVehicleBusiness],
})
export class StructuredDataVehicleComponent
  extends StructuredDataAbstractComponent<StructuredDataItemModel>
  implements OnInit
{
  constructor(private business: StructuredDataVehicleBusiness) {
    super();
  }
  query?: StructuredDataVehicleQueryModel;
  style = {
    width: 'calc(815px + 40px)',
    height: 'calc(465px + 40px)',
  };
  ngOnInit(): void {}

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
}
