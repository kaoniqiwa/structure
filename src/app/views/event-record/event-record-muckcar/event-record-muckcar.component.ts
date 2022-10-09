import { AfterViewInit, Component, EventEmitter, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { DateTimePickerView } from 'src/app/directives/date-time-picker/date-time-picker.directive';
import { Page, PagedList } from 'src/app/models/page-list.model';
import { DateTimeTool } from 'src/app/tools/datetime.tool';
import { EventRecordMuckCarTableArgs } from '../../tables/event-record/event-record-muckcar-table/event-record-muckcar-table.model';

@Component({
  selector: 'app-event-record-muckcar',
  templateUrl: './event-record-muckcar.component.html',
  styleUrls: ['./event-record-muckcar.component.less'],
})
export class EventRecordMuckCarComponent implements OnInit, AfterViewInit {
  constructor() {}

  args = new EventRecordMuckCarTableArgs();
  load: EventEmitter<EventRecordMuckCarTableArgs> = new EventEmitter();
  page?: Page;
  DateTimePickerView = DateTimePickerView;

  ngOnInit(): void {
    this.args.page = new Page();
    this.args.page.PageIndex = 1;
    let date = new Date();
    date.setMonth(7);
    this.args.duration = DateTimeTool.allMonth(date);
  }
  ngAfterViewInit(): void {
    this.load.emit(this.args);
  }

  changeBegin(date: Date) {
    this.args.duration.begin = date;
  }
  changeEnd(date: Date) {
    this.args.duration.end = date;
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
