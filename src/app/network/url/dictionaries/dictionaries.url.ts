import { AbstractUrl } from '../abstract.url';
import { BasicUrl } from '../basic.url';

export class DictionariesUrl extends AbstractUrl {
  private static url = new DictionariesUrl(`${BasicUrl.aiop}/Dictionaries`);

  static people(name: string) {
    return `${this.url.basic()}/Peoples/${name}`;
  }
  static vehicle(name: string) {
    return `${this.url.basic()}/Vehicles/${name}`;
  }
  static commons(name: string) {
    return `${this.url.basic()}/Commons/${name}`;
  }
}
