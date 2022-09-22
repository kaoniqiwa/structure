import { AbstractUrl } from '../abstract.url';
import { BasicUrl } from '../basic.url';

export class MediumUrl extends AbstractUrl {
  private static url = new MediumUrl(`${BasicUrl.aiop}/Medium`);

  static basic() {
    return this.url.basic();
  }
  static item(id: string) {
    return this.url.item(id);
  }
  static list() {
    return this.url.list();
  }

  static picture() {
    return new MediumPicturesUrl(this.basic());
  }

  static videoFile() {
    return new VideoFilesUrl(this.basic());
  }
  static server() {
    return new ServersUrl(this.basic());
  }
}

class MediumPicturesUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Pictures`);
  }

  formFile() {
    return `${this.basic()}/FormFile`;
  }
  binary() {
    return `${this.basic()}/Binary`;
  }

  data(id: string) {
    return `${this.item(id)}/Data`;
  }

  jpg(id: string) {
    return `${this.item(id)}.jpg`;
  }

  url() {
    return `${this.basic()}/Urls`;
  }
}

class VideoFilesUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/VideoFiles`);
  }

  data(id: string) {
    return `${this.item(id)}/Data`;
  }
  mp4(id: string) {
    return `${this.item(id)}.mp4`;
  }
}

class ServersUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Servers`);
  }
}
