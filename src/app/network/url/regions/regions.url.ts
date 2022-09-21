import { AbstractUrl } from '../abstract.url';
import { api_aiop_service_url } from '../basic.url';

export class RegionsUrl extends AbstractUrl {
  private static url = new RegionsUrl(`${api_aiop_service_url}/Regions`);

  static basic() {
    return this.url.basic();
  }
  static item(id: string) {
    return this.url.item(id);
  }
  static list() {
    return this.url.list();
  }
  static node(id?: string) {
    let url = id ? this.item(id) : this.basic();
    return new RegionsNodesUrl(url);
  }
  static resource(id: string) {
    return new RegionsResourcesUrl(this.item(id));
  }
}

class RegionsNodesUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Nodes`);
  }
}

class RegionsResourcesUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Resources`);
  }
}
