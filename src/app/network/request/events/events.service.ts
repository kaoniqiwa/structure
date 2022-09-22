import { Injectable } from '@angular/core';
import { FaceEventRecord } from 'src/app/models/event-record/face-event.record';
import { MuckCarEventRecord } from 'src/app/models/event-record/muck-car-event.record';
import { VehicleEventRecord } from 'src/app/models/event-record/vehicle-event.record';
import {
  BaseRequestService,
  BaseTypeRequestService,
} from '../../base-request.service';
import { HowellAuthHttpService } from '../../howell-auth-http.service';
import { EventsUrl } from '../../url/events/events.url';
import {
  GetFaceEventRecordsParams,
  GetMuckCarEventRecordsParams,
  GetVehicleEventRecordsParams,
} from './events.params';

@Injectable({
  providedIn: 'root',
})
export class EventRequestSerivce {
  private basic: BaseRequestService;

  constructor(http: HowellAuthHttpService) {
    this.basic = new BaseRequestService(http);
  }

  private _record?: EventRecordRequestService;
  public get record(): EventRecordRequestService {
    if (!this._record) {
      this._record = new EventRecordRequestService(this.basic);
    }
    return this._record;
  }
}

class EventRecordRequestService {
  constructor(private basic: BaseRequestService) {}
  private _face?: EventRecordFaceRequestService;
  public get face(): EventRecordFaceRequestService {
    if (!this._face) {
      this._face = new EventRecordFaceRequestService(this.basic);
    }
    return this._face;
  }
  private _vehicle?: EventRecordVehicleRequestService;
  public get vehicle(): EventRecordVehicleRequestService {
    if (!this._vehicle) {
      this._vehicle = new EventRecordVehicleRequestService(this.basic);
    }
    return this._vehicle;
  }
  private _muckCar?: EventRecordMuckCarRequestService;
  public get muckCar(): EventRecordMuckCarRequestService {
    if (!this._muckCar) {
      this._muckCar = new EventRecordMuckCarRequestService(this.basic);
    }
    return this._muckCar;
  }
}
class EventRecordFaceRequestService {
  constructor(basic: BaseRequestService) {
    this.type = basic.type(FaceEventRecord);
  }
  private type: BaseTypeRequestService<FaceEventRecord>;
  list(params: GetFaceEventRecordsParams = new GetFaceEventRecordsParams()) {
    let url = EventsUrl.record().face().list();
    return this.type.paged(url, params);
  }
}
class EventRecordVehicleRequestService {
  constructor(basic: BaseRequestService) {
    this.type = basic.type(VehicleEventRecord);
  }
  private type: BaseTypeRequestService<VehicleEventRecord>;
  list(
    params: GetVehicleEventRecordsParams = new GetVehicleEventRecordsParams()
  ) {
    let url = EventsUrl.record().vehicle().list();
    return this.type.paged(url, params);
  }
}
class EventRecordMuckCarRequestService {
  constructor(basic: BaseRequestService) {
    this.type = basic.type(MuckCarEventRecord);
  }
  private type: BaseTypeRequestService<MuckCarEventRecord>;
  list(
    params: GetMuckCarEventRecordsParams = new GetMuckCarEventRecordsParams()
  ) {
    let url = EventsUrl.record().muckCar().list();
    return this.type.paged(url, params);
  }
}
