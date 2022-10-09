import { Component, EventEmitter, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Page, PagedList } from 'src/app/models/page-list.model';
import { DateTimeTool } from 'src/app/tools/datetime.tool';
import { EventRecordFaceTableArgs } from '../../tables/event-record/event-record-face-table/event-record-face-table.model';

@Component({
  selector: 'app-event-record-face',
  templateUrl: './event-record-face.component.html',
  styleUrls: ['./event-record-face.component.less'],
})
export class EventRecordFaceComponent implements OnInit {
  constructor() {}

  args = new EventRecordFaceTableArgs();
  load: EventEmitter<EventRecordFaceTableArgs> = new EventEmitter();
  page?: Page;

  ngOnInit(): void {
    this.args.page = new Page();
    this.args.page.PageIndex = 1;
    let date = new Date();
    date.setMonth(8);
    this.args.duration = DateTimeTool.allMonth(date);
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
}
