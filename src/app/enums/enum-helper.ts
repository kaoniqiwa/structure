import { OnlineStatus } from './online-status.enum';
import { StationState } from './station-state.enum';
import { UserResourceType } from './user-resource-type.enum';

export class EnumHelper {
  constructor() {}

  static GetStationState(status: OnlineStatus) {
    switch (status) {
      case OnlineStatus.online:
        return StationState.Normal;
      case OnlineStatus.offline:
      default:
        return StationState.Error;
    }
  }
}

export class Enum {
  obj: any;
  constructor(obj: any) {
    this.obj = obj;
  }

  getName(value: any) {
    return this.obj[value];
  }

  getKeys() {
    let keys = Object.keys(this.obj);
    let count = keys.length / 2;
    keys.splice(0, count);
    return keys;
  }
  getValues() {
    let keys = Object.keys(this.obj);
    let count = keys.length / 2;
    let values = keys.splice(0, count);
    return values;
  }

  toMap<T>(creater?: (obj: any) => T) {
    let keys = this.getKeys();
    let map = new Map(
      keys.map((x) => {
        return [x, creater ? creater(this.obj[x]) : this.obj[x]];
      })
    );
    return map;
  }

  toArray<T>(creater?: (obj: any) => T) {
    let keys = this.getKeys();
    return keys.map((x) => {
      return creater ? creater(this.obj[x]) : this.obj[x];
    });
  }
}
