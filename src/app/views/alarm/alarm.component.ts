import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { IComponent } from 'src/app/interfaces/component.interfact';
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
}
