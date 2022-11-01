import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CommonFlatNode } from 'src/app/components/common-tree/common-flat-node.model';
import { DateTimePickerView } from 'src/app/directives/date-time-picker/date-time-picker.directive';
import { IntelligentType } from 'src/app/enums/intelligent-type.enum';
import { VideoArgs } from 'src/app/models/args/video.args';
import { EventRecord } from 'src/app/models/event-record/event.record';
import { KeyValueItem } from 'src/app/models/key-value-item.model';
import { Page, PagedList } from 'src/app/models/page-list.model';
import { RegionNode } from 'src/app/models/region-node.model';
import { DateTimeTool } from 'src/app/tools/datetime.tool';
import { Language } from 'src/app/tools/language';
import { EventRecordMuckCarTableArgs } from '../../tables/event-record/event-record-muckcar-table/event-record-muckcar-table.model';
import { EventRecordMuckcarBusiness } from './event-record-muckcar.business';

@Component({
  selector: 'app-event-record-muckcar',
  templateUrl: './event-record-muckcar.component.html',
  styleUrls: [
    '../event-record-item.less',
    './event-record-muckcar.component.less',
  ],
  providers: [EventRecordMuckcarBusiness],
})
export class EventRecordMuckCarComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Output()
  details: EventEmitter<EventRecord> = new EventEmitter();
  @Output()
  playback: EventEmitter<VideoArgs> = new EventEmitter();
  constructor(private business: EventRecordMuckcarBusiness) {}

  args = new EventRecordMuckCarTableArgs();
  load: EventEmitter<EventRecordMuckCarTableArgs> = new EventEmitter();
  page?: Page;
  DateTimePickerView = DateTimePickerView;
  expand = false;
  nodes: RegionNode[] = [];
  handle: any;
  intelligentTypes: KeyValueItem<string | undefined, number | undefined>[] = [];

  ngOnInit(): void {
    this.args.page = new Page();
    this.args.page.PageIndex = 1;
    let date = new Date();
    this.args.duration = DateTimeTool.allDay(date);

    this.handle = this.onWindowClicked.bind(this);
    window.addEventListener('click', this.handle);

    this.init();
  }
  ngAfterViewInit(): void {
    this.load.emit(this.args);
  }
  ngOnDestroy(): void {
    window.removeEventListener('click', this.handle);
  }
  async init() {
    let item = new KeyValueItem();
    let value = undefined;
    item.Key = value;
    item.Value = value;
    item.Name = Language.IntelligentType(value);
    this.intelligentTypes.push(item);

    item = new KeyValueItem();
    value = IntelligentType.rearcover_error;
    item.Key = value;
    item.Value = value;
    item.Name = Language.IntelligentType(value);
    this.intelligentTypes.push(item);

    item = new KeyValueItem();
    value = IntelligentType.unlicensed_car;
    item.Key = value;
    item.Value = value;
    item.Name = Language.IntelligentType(value);
    this.intelligentTypes.push(item);
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
    if (this.nodes.length > 0) {
      this.args.cameraIds = this.nodes.map((x) => x.ResourceId);
    } else {
      this.args.cameraIds = undefined;
    }
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
