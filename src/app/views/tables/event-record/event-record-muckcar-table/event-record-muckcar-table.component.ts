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
import { IModel } from 'src/app/models/model.interface';
import { PagedList } from 'src/app/models/page-list.model';
import { EventRecordMuckCarTableBusiness } from './event-record-muckcar-table.business';
import {
  EventRecordMuckCarTableArgs,
  EventRecordMuckCarTableModel,
} from './event-record-muckcar-table.model';

@Component({
  selector: 'app-event-record-muckcar-table',
  templateUrl: './event-record-muckcar-table.component.html',
  styleUrls: [
    '../../table.less',
    './event-record-muckcar-table.component.less',
  ],
  providers: [EventRecordMuckCarTableBusiness],
})
export class EventRecordMuckCarTableComponent
  implements
    IComponent<IModel, PagedList<EventRecordMuckCarTableModel>>,
    OnInit,
    OnChanges
{
  @Input()
  business: IBusiness<IModel, PagedList<EventRecordMuckCarTableModel>>;
  @Input()
  load?: EventEmitter<EventRecordMuckCarTableArgs>;

  @Output()
  loaded: EventEmitter<PagedList<EventRecordMuckCarTableModel>> =
    new EventEmitter();
  @Output()
  picture: EventEmitter<PictureArgs> = new EventEmitter();
  @Output()
  playback: EventEmitter<VideoArgs> = new EventEmitter();

  constructor(business: EventRecordMuckCarTableBusiness) {
    this.business = business;
  }

  datas: EventRecordMuckCarTableModel[] = [];
  widths = ['20%', '16%', '16%', '16%', '16%', '16%'];
  ngOnInit(): void {
    if (!this.load) {
      this.loadData(new EventRecordMuckCarTableArgs());
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
  async loadData(args: EventRecordMuckCarTableArgs) {
    let paged = await this.business.load(
      args.duration,
      args.page ? args.page.PageIndex : 1,
      args.page?.PageSize,
      args.name
    );
    this.datas = paged.Data;
    this.loaded.emit(paged);
  }
  onpicture(e: Event, item: EventRecordMuckCarTableModel) {
    let args = PictureArgsConverter.Convert(item.data);
    this.picture.emit(args);
    e.stopPropagation();
  }
  onplayback(e: Event, item: EventRecordMuckCarTableModel) {
    let args = VideoArgsConverter.Convert(item.data);
    this.playback.emit(args);
    e.stopPropagation();
  }
  onitemclicked(item: EventRecordMuckCarTableModel) {}
}
