import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CommonFlatNode } from 'src/app/components/common-tree/common-flat-node.model';
import { DateTimePickerView } from 'src/app/directives/date-time-picker/date-time-picker.directive';
import { VideoArgs } from 'src/app/models/args/video.args';
import { EventRecord } from 'src/app/models/event-record/event.record';
import { Page, PagedList } from 'src/app/models/page-list.model';
import { RegionNode } from 'src/app/models/region-node.model';
import { DateTimeTool } from 'src/app/tools/datetime.tool';
import { EventRecordVehicleTableArgs } from '../../tables/event-record/event-record-vehicle-table/event-record-vehicle-table.model';

@Component({
  selector: 'app-event-record-vehicle',
  templateUrl: './event-record-vehicle.component.html',
  styleUrls: [
    '../event-record-item.less',
    './event-record-vehicle.component.less',
  ],
})
export class EventRecordVehicleComponent implements OnInit, AfterViewInit {
  @Output()
  details: EventEmitter<EventRecord> = new EventEmitter();
  @Output()
  playback: EventEmitter<VideoArgs> = new EventEmitter();
  constructor() {}

  args = new EventRecordVehicleTableArgs();
  load: EventEmitter<EventRecordVehicleTableArgs> = new EventEmitter();
  page?: Page;
  DateTimePickerView = DateTimePickerView;
  expand = false;
  nodes: RegionNode[] = [];
  handle: any;

  ngOnInit(): void {
    this.args.page = new Page();
    this.args.page.PageIndex = 1;
    let date = new Date();
    this.args.duration = DateTimeTool.allMonth(date);

    this.handle = this.onWindowClicked.bind(this);
    window.addEventListener('click', this.handle);
  }
  ngAfterViewInit(): void {
    this.load.emit(this.args);
  }
  ngOnDestroy(): void {
    window.removeEventListener('click', this.handle);
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
  ondetails(model: EventRecord) {
    this.details.emit(model);
  }
  onplayback(args: VideoArgs) {
    this.playback.emit(args);
  }

  //#region Node
  onchiplistclicked(event: Event) {
    this.expand = !this.expand;
    event.cancelBubble = true;
  }
  remove(item: RegionNode): void {
    const index = this.nodes.indexOf(item);
    if (index >= 0) {
      this.nodes.splice(index, 1);
    }
  }

  onNodeSelected(nodes: CommonFlatNode[]) {
    let changed = false;

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (this.nodes.map((x) => x.Id).includes(node.Id)) {
        continue;
      }
      if (node.RawData instanceof RegionNode) {
        this.nodes.push(node.RawData);
        changed = true;
      }
    }
    if (changed) {
      this.expand = false;
    }
  }
  onWindowClicked() {
    this.expand = false;
  }
  //#endregion
}
