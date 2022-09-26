import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PictureArgsConverter } from 'src/app/converters/args/picture-args.converter';
import { VideoArgsConverter } from 'src/app/converters/args/video-args.converter';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { IComponent } from 'src/app/interfaces/component.interfact';
import { PictureArgs } from 'src/app/models/args/picture.args';
import { VideoArgs } from 'src/app/models/args/video.args';
import { IModel } from 'src/app/models/model.interface';
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
  picture: EventEmitter<PictureArgs> = new EventEmitter();
  @Output()
  playback: EventEmitter<VideoArgs> = new EventEmitter();

  constructor(business: AlarmBusiness) {
    this.business = business;
  }

  datas: AlarmModel[] = [];

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    this.datas = await this.business.load(new Date());
    this.loaded.emit(this.datas);
  }
  onpicture(item: AlarmModel) {
    let args = PictureArgsConverter.Convert(item.data);
    this.picture.emit(args);
  }
  onplayback(item: AlarmModel) {
    let args = VideoArgsConverter.Convert(item.data);
    this.playback.emit(args);
  }
}
