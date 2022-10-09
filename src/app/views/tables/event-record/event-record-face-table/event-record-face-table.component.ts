import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { PictureArgsConverter } from 'src/app/converters/args/picture-args.converter';
import { VideoArgsConverter } from 'src/app/converters/args/video-args.converter';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { IComponent } from 'src/app/interfaces/component.interfact';
import { PictureArgs } from 'src/app/models/args/picture.args';
import { VideoArgs } from 'src/app/models/args/video.args';
import { Duration } from 'src/app/models/duration.model';
import { IModel } from 'src/app/models/model.interface';
import { Page, PagedList } from 'src/app/models/page-list.model';
import { DateTimeTool } from 'src/app/tools/datetime.tool';
import { EventRecordFaceTableBusiness } from './event-record-face-table.business';
import {
  EventRecordFaceTableArgs,
  EventRecordFaceTableModel,
} from './event-record-face-table.model';

@Component({
  selector: 'app-event-record-face-table',
  templateUrl: './event-record-face-table.component.html',
  styleUrls: ['../../table.less', './event-record-face-table.component.less'],
  providers: [EventRecordFaceTableBusiness],
})
export class EventRecordFaceTableComponent
  implements
    IComponent<IModel, PagedList<EventRecordFaceTableModel>>,
    OnInit,
    OnChanges
{
  @Input()
  business: IBusiness<IModel, PagedList<EventRecordFaceTableModel>>;
  @Input()
  load?: EventEmitter<EventRecordFaceTableArgs>;

  @Output()
  loaded: EventEmitter<PagedList<EventRecordFaceTableModel>> =
    new EventEmitter();
  @Output()
  picture: EventEmitter<PictureArgs> = new EventEmitter();
  @Output()
  playback: EventEmitter<VideoArgs> = new EventEmitter();

  constructor(business: EventRecordFaceTableBusiness) {
    this.business = business;
  }

  datas: EventRecordFaceTableModel[] = [];
  widths = ['20%', '16%', '16%', '16%', '16%', '16%'];
  ngOnInit(): void {
    if (!this.load) {
      this.loadData(new EventRecordFaceTableArgs());
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['load']) {
      if (this.load) {
        this.load.subscribe((x) => {
          this.loadData(x);
        });
      }
    }
  }
  async loadData(args: EventRecordFaceTableArgs) {
    let paged = await this.business.load(
      args.duration,
      args.page ? args.page.PageIndex : 1,
      args.page?.PageSize,
      args.name
    );
    this.datas = paged.Data;
    this.loaded.emit(paged);
  }
  onpicture(e: Event, item: EventRecordFaceTableModel) {
    let args = PictureArgsConverter.Convert(item.data);
    this.picture.emit(args);
    e.stopPropagation();
  }
  onplayback(e: Event, item: EventRecordFaceTableModel) {
    let args = VideoArgsConverter.Convert(item.data);
    this.playback.emit(args);
    e.stopPropagation();
  }
  onitemclicked(item: EventRecordFaceTableModel) {}
}
