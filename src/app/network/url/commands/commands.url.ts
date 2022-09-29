import { AbstractUrl } from '../abstract.url';
import { BasicUrl } from '../basic.url';

export class CommandsUrl extends AbstractUrl {
  private static url = new CommandsUrl(`${BasicUrl.struct}/Commands`);

  static resource() {
    return new ResourcesUrl(this.url.basic());
  }
  static ai() {
    return new AIUrl(this.url.basic());
  }
}

//#region Commands/Resources
class ResourcesUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Resources`);
  }
  camera() {
    return new ResourcesCamerasUrl(this.basic());
  }
}
class ResourcesCamerasUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Cameras`);
  }
  manualCapture(id: string) {
    return `${this.item(id)}/ManualCapture`;
  }
  aiRuleConfig(id: string) {
    return `${this.item(id)}/AIRuleConfig`;
  }
}
//#endregion
//#region Commands/AI
class AIUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/AI`);
  }

  face() {
    return new AIFacesUrl(this.basic());
  }
  vehicle() {
    return new AIVehiclesUrl(this.basic());
  }
  body() {
    return new AIBodiesUrl(this.basic());
  }
}

class AIFacesUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Faces`);
  }

  modeling() {
    return `${this.basic()}/Modeling`;
  }
  record() {
    return new AIRecordsUrl(this.basic());
  }
  deployControl() {
    return new AIDeployControlUrl(this.basic());
  }
}

class AIVehiclesUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Vehicles`);
  }

  modeling() {
    return `${this.basic()}/Modeling`;
  }
  record() {
    return new AIRecordsUrl(this.basic());
  }
  deployControl() {
    return new AIDeployControlUrl(this.basic());
  }
}

class AIBodiesUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Bodies`);
  }

  modeling() {
    return `${this.basic()}/Modeling`;
  }
  record() {
    return new AIRecordsUrl(this.basic());
  }
}

class AIRecordsUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Records`);
  }
  queryByAttribute() {
    return `${this.basic()}/QueryByAttribute`;
  }
  queryByImage() {
    return `${this.basic()}/QueryByImage`;
  }
}
class AIDeployControlUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/DeployControl`);
  }
  task() {
    return new AIDeployControlTasksUrl(this.basic());
  }
}
class AIDeployControlTasksUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Tasks`);
  }
}

//#endregion
