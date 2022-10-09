import { AfterViewInit, Component, EventEmitter, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { DateTimePickerView } from 'src/app/directives/date-time-picker/date-time-picker.directive';
import { Page, PagedList } from 'src/app/models/page-list.model';
import { DateTimeTool } from 'src/app/tools/datetime.tool';
import { DeployFaceTableArgs } from '../../tables/deploy/deploy-face-table/deploy-face-table.model';

@Component({
  selector: 'app-deploy-face-list',
  templateUrl: './deploy-face-list.component.html',
  styleUrls: ['./deploy-face-list.component.less'],
})
export class DeployFaceListComponent implements OnInit, AfterViewInit {
  constructor() {}

  args = new DeployFaceTableArgs();
  load: EventEmitter<DeployFaceTableArgs> = new EventEmitter();
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
