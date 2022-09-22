import { AbstractUrl } from '../abstract.url';
import { BasicUrl } from '../basic.url';

export class SRServersUrl extends AbstractUrl {
  private static url = new SRServersUrl(`${BasicUrl.struct}/SRServers`);

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

  static preview() {
    return `${this.basic()}/PreviewUrls`;
  }
  static playback() {
    return `${this.basic()}/VodUrls`;
  }
}
