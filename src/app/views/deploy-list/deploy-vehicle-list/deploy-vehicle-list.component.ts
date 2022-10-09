import { AfterViewInit, Component, EventEmitter, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { DateTimePickerView } from 'src/app/directives/date-time-picker/date-time-picker.directive';
import { Page, PagedList } from 'src/app/models/page-list.model';
import { DeployVehicleTableArgs } from '../../tables/deploy/deploy-vehicle-table/deploy-vehicle-table.model';

@Component({
  selector: 'app-deploy-vehicle-list',
  templateUrl: './deploy-vehicle-list.component.html',
  styleUrls: ['./deploy-vehicle-list.component.less'],
})
export class DeployVehicleListComponent implements OnInit, AfterViewInit {
  constructor() {}

  args = new DeployVehicleTableArgs();
  load: EventEmitter<DeployVehicleTableArgs> = new EventEmitter();
  page?: Page;
  DateTimePickerView = DateTimePickerView;

  ngOnInit(): void {
    this.args.page = new Page();
    this.args.page.PageIndex = 1;
  }
  ngAfterViewInit(): void {
    this.load.emit(this.args);
  }

  pageEvent(page: PageEvent) {
    if (!this.args.page) {
      this.args.page = new Page();
      this.args.page.PageIndex = 0;
    }
    this.args.page.PageIndex = page.pageIndex + 1;
    this.load.emit(this.args);
  }
  onloaded(paged: PagedList<any>) {
    this.page = paged.Page;
  }
  onsearch() {
    this.load.emit(this.args);
  }
}
