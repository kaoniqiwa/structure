import { AbstractUrl } from '../abstract.url';
import { api_aiop_service_url } from '../basic.url';

export class ResourcesUrl extends AbstractUrl {
  private static url = new ResourcesUrl(`${api_aiop_service_url}/Resources`);

  static basic() {
    return this.url.basic();
  }
  static item(id: string) {
    return this.url.item(id);
  }
  static list() {
    return this.url.list();
  }

  static encodeDevice() {
    return new EncodeDevicesUrl(this.basic());
  }

  static camera() {
    return new CamerasUrl(this.basic());
  }
  static label(id?: string) {
    let base = id ? this.item(id) : this.basic();
    return new LabelsUrl(base);
  }
  static online() {
    return new OnlineStatusUrl(this.basic());
  }

  static crossing() {
    return new CrossingsRecordsUrl(this.basic());
  }
}
//#region EncodeDevices
class EncodeDevicesUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/EncodeDevices`);
  }

  protocol(): string {
    return `${this.basic()}/Protocols`;
  }
}
//#endregion
//#region Cameras
class CamerasUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Cameras`);
  }

  aiModels(cameraId: string) {
    return new CamerasAIModelsUrl(this.item(cameraId));
  }
}

class CamerasAIModelsUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/AIModels`);
  }

  copyTo(): string {
    return `${this.basic()}/CopyTo`;
  }
}
//#endregion
//#region Labels
class LabelsUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Labels`);
  }
  batch(id: string): string {
    return `${this.item(id)}/Batch`;
  }
}
//#endregion

//#region
class OnlineStatusUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/OnlineStatus`);
  }
  record() {
    return new OnlineStatusRecordsUrl(this.basic());
  }
}
class OnlineStatusRecordsUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Records`);
  }
}

//#endregion

//#region Crossings
class CrossingsRecordsUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Crossings`);
  }
}
//#endregion
