import { AbstractUrl } from '../abstract.url';
import { BasicUrl } from '../basic.url';

export class PlatformsUrl extends AbstractUrl {
  private static url = new PlatformsUrl(`${BasicUrl.aiop}/Platforms`);

  static basic() {
    return this.url.basic();
  }
  static item(id: string) {
    return this.url.item(id);
  }
  static list() {
    return this.url.list();
  }

  static sync(id: string) {
    return `${this.item(id)}/Sync`;
  }
  static protocols() {
    return `${this.basic()}/Protocols`;
  }
}
