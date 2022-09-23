import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/interfaces/business.interface';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/interfaces/converter.interface';
import { EventRecord } from 'src/app/models/event-record/event.record';
import { DurationParams } from 'src/app/network/IParams.interface';
import { AlarmModel } from './alarm.model';
import { AlarmFaceBusiness } from './business/alarm-face.business';
import { AlarmMuckCarBusiness } from './business/alarm-muck-car.business';
import { AlarmVehicleBusiness } from './business/alarm-vehicle.business';

@Injectable()
export class AlarmBusiness implements IBusiness<EventRecord[], AlarmModel[]> {
  constructor(
    private face: AlarmFaceBusiness,
    private vehicle: AlarmVehicleBusiness,
    private car: AlarmMuckCarBusiness
  ) {}
  Converter!: IConverter<EventRecord[], AlarmModel[]>;
  loading?: EventEmitter<void> | undefined;
  async load(date: Date): Promise<AlarmModel[]> {
    date.setMonth(7);
    let duration = DurationParams.allMonth(date);
    let models: AlarmModel[] = [
      ...(await this.face.load(duration)),
      ...(await this.vehicle.load(duration)),
      ...(await this.car.load(duration)),
    ];

    models = models.sort((a, b) => {
      return a.time.getTime() - b.time.getTime();
    });

    return models;
  }
  getData(duration: DurationParams): Promise<EventRecord[]> {
    throw new Error('Method not implemented.');
  }
}
