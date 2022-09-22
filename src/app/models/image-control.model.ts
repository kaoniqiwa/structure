import { OnlineStatus } from '../enums/online-status.enum';
import { EventRule } from './event-rule';
import { Camera } from './resource/camera.resource';

export class ImageControlModel<T = Camera> {
  constructor(
    id: string,
    name: string,
    src: string,
    onerror: string,
    status: OnlineStatus = OnlineStatus.offline,
    camera: T,
    eventTime?: Date,
    rules?: EventRule[]
  ) {
    this.id = id;
    this.name = name;
    this.src = src;
    this.onerror = onerror;
    this.status = status;
    this.camera = camera;
    if (eventTime) {
      this.eventTime = new Date(eventTime);
    }
    this.rules = rules;
  }
  eventTime?: Date;
  camera: T;
  name: string;
  src: string;
  id: string;
  onerror: string;
  status: OnlineStatus = OnlineStatus.offline;
  index = 0;
  rules?: EventRule[];
}

export class ImageControlModelArray {
  constructor(models: ImageControlModel[], index: number, autoplay = false) {
    this.models = models;
    this.index = index;
    this.autoplay = autoplay;
  }
  models: ImageControlModel[];
  autoplay: boolean;
  index: number;
}
