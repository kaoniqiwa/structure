import { AbstractUrl } from '../abstract.url';
import { BasicUrl } from '../basic.url';

export class EventsUrl extends AbstractUrl {
  private static url = new EventsUrl(`${BasicUrl.struct}/Resources`);

  static record() {
    return new RecordsUrl(this.url.basic());
  }
}

class RecordsUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Records`);
  }

  cameraAI() {
    return new RecordsCameraAIUrl(this.basic());
  }
  face() {
    return new RecordsFacesUrl(this.basic());
  }
  vehicle() {
    return new RecordsVehiclesUrl(this.basic());
  }
  muckCar() {
    return new RecordsMuckCarsUrl(this.basic());
  }
}

class RecordsCameraAIUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/CameraAI`);
  }
}
class RecordsFacesUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Faces`);
  }
}
class RecordsVehiclesUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Vehicles`);
  }
}
class RecordsMuckCarsUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/MuckCars`);
  }
}
