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
import { EventRecord } from 'src/app/models/event-record/event.record';
import { IModel } from 'src/app/models/model.interface';
import { PagedList } from 'src/app/models/page-list.model';
import { EventRecordVehicleTableBusiness } from './event-record-vehicle-table.business';
import {
  EventRecordVehicleTableArgs,
  EventRecordVehicleTableModel,
} from './event-record-vehicle-table.model';

@Component({
  selector: 'app-event-record-vehicle-table',
  templateUrl: './event-record-vehicle-table.component.html',
  styleUrls: [
    '../../table.less',
    './event-record-vehicle-table.component.less',
  ],
  providers: [EventRecordVehicleTableBusiness],
})
export class EventRecordVehicleTableComponent
  implements
    IComponent<IModel, PagedList<EventRecordVehicleTableModel>>,
    OnInit,
    OnChanges
{
  @Input()
  business: IBusiness<IModel, PagedList<EventRecordVehicleTableModel>>;
  @Input()
  load?: EventEmitter<EventRecordVehicleTableArgs>;

  @Output()
  loaded: EventEmitter<PagedList<EventRecordVehicleTableModel>> =
    new EventEmitter();
  @Output()
  picture: EventEmitter<PictureArgs> = new EventEmitter();
  @Output()
  playback: EventEmitter<VideoArgs> = new EventEmitter();
  @Output()
  details: EventEmitter<EventRecord> = new EventEmitter();

  constructor(business: EventRecordVehicleTableBusiness) {
    this.business = business;
  }

  datas: EventRecordVehicleTableModel[] = [];
  widths = ['20%', '16%', '16%', '16%', '16%', '16%'];
  ngOnInit(): void {
    if (!this.load) {
      this.loadData(new EventRecordVehicleTableArgs());
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
  async loadData(args: EventRecordVehicleTableArgs) {
    let paged = await this.business.load(args);
    this.datas = paged.Data;
    this.loaded.emit(paged);
  }
  onpicture(e: Event, item: EventRecordVehicleTableModel) {
    let args = PictureArgsConverter.Convert(item.data);
    this.picture.emit(args);
    e.stopPropagation();
  }
  onplayback(e: Event, item: EventRecordVehicleTableModel) {
    let args = VideoArgsConverter.Convert(item.data);
    this.playback.emit(args);
    e.stopPropagation();
  }
  ondetails(e: Event, item: EventRecordVehicleTableModel) {
    this.details.emit(item.data);
    e.stopPropagation();
  }
  onitemclicked(item: EventRecordVehicleTableModel) {}
}
