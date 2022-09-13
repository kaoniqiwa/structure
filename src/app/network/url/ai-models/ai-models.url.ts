import { AbstractUrl } from '../abstract.url';
import { api_aiop_service_url } from '../basic.url';

export class AIModelsUrl extends AbstractUrl {
  private static url = new AIModelsUrl(`${api_aiop_service_url}/AIModels`);

  static basic() {
    return this.url.basic();
  }
  static item(id: string) {
    return this.url.item(id);
  }
  static list() {
    return this.url.list();
  }

  static parse() {
    return `${this.basic()}/Parse`;
  }
}
