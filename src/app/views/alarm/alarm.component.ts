import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VideoArgsConverter } from 'src/app/converters/args/video-args.converter';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { IComponent } from 'src/app/interfaces/component.interfact';
import { VideoArgs } from 'src/app/models/args/video.args';
import { EventRecord } from 'src/app/models/event-record/event.record';
import { IModel } from 'src/app/models/model.interface';
import { StoreService } from 'src/app/tools/service/store.service';
import { AlarmBusiness } from './alarm.business';
import { AlarmModel } from './alarm.model';
import { AlarmFaceBusiness } from './business/alarm-face.business';
import { AlarmMuckCarBusiness } from './business/alarm-muck-car.business';
import { AlarmVehicleBusiness } from './business/alarm-vehicle.business';

@Component({
  selector: 'howell-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.less'],
  providers: [
    AlarmBusiness,
    AlarmFaceBusiness,
    AlarmVehicleBusiness,
    AlarmMuckCarBusiness,
  ],
})
export class AlarmComponent
  implements IComponent<IModel, AlarmModel[]>, OnInit
{
  @Input()
  business: IBusiness<IModel, AlarmModel[]>;
  @Output()
  loaded: EventEmitter<AlarmModel[]> = new EventEmitter();
  @Output()
  picture: EventEmitter<EventRecord> = new EventEmitter();
  @Output()
  playback: EventEmitter<VideoArgs> = new EventEmitter();

  constructor(business: AlarmBusiness, private store: StoreService) {
    this.business = business;
  }

  datas: AlarmModel[] = [];

  ngOnInit(): void {
    this.loadData();
    this.store.interval.subscribe((x) => {
      this.loadData();
    });
    this.store.refresh.subscribe((x) => {
      this.loadData();
    });
  }

  async loadData() {
    this.datas = await this.business.load(new Date());
    this.loaded.emit(this.datas);
  }
  onpicture(e: Event, item: AlarmModel) {
    this.picture.emit(item.data);
    e.stopPropagation();
  }
  onplayback(e: Event, item: AlarmModel) {
    let args = VideoArgsConverter.Convert(item.data);
    this.playback.emit(args);
    e.stopPropagation();
  }

  onitemclicked(item: AlarmModel) {
    this.loaded.emit([item]);
  }
}
