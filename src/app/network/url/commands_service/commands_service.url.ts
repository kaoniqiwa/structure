import { AbstractUrl } from '../abstract.url';
import { api_aiop_service_url } from '../basic.url';

export class CommandsServiceUrl extends AbstractUrl {
  private static url = new CommandsServiceUrl(
    `${api_aiop_service_url}/commands_service`
  );

  static picture() {
    return new CommandsServicePicturesUrl(this.url.basic());
  }
}
class CommandsServicePicturesUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Pictures`);
  }
  camera() {
    return new CommandsServicePicturesCamerasUrl(this.basic());
  }
}
class CommandsServicePicturesCamerasUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Cameras`);
  }

  manualCapture(id?: string) {
    let url = id ? this.item(id) : this.basic();
    return `${url}/ManualCapture`;
  }
}
