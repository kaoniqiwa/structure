import { AbstractUrl } from '../abstract.url';
import { BasicUrl } from '../basic.url';

export class TasksUrl extends AbstractUrl {
  private static url = new TasksUrl(`${BasicUrl.aiop}/Tasks`);

  static basic() {
    return this.url.basic();
  }
  static item(id: string) {
    return this.url.item(id);
  }
  static list() {
    return this.url.list();
  }
  static schedule() {
    return new SchedulesUrl(this.basic());
  }
  static capturePicture() {
    return new CapturePictureUrl(this.basic());
  }
}

class SchedulesUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Schedules`);
  }
}
class CapturePictureUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/CapturePicture`);
  }
}
