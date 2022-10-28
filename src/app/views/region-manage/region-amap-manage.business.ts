import { Injectable } from '@angular/core';
import { Region } from 'src/app/models/region.model';
import { StoreService } from 'src/app/tools/service/store.service';

@Injectable()
export class RegionAMapManageBusiness {
  controller: CesiumDataController.Controller;

  basic?: CesiumDataController.Village;

  constructor(private store: StoreService) {
    let port = '80';
    if (location.port) {
      port = location.port;
    }
    this.controller = new CesiumDataController.Controller(
      location.hostname,
      parseInt(port),
      async () => {
        let regionId = await store.regionId;
        this.basic = this.controller.Village.Get(regionId);
      }
    );
  }

  create(region: Region) {
    if (this.basic) {
      let village = new CesiumDataController.Village().Instantiate(this.basic);
      village.id = region.Id;
      village.name = region.Name;
      if (region.ParentId) {
        village.parentId = region.ParentId;
      }
      village.center = this.basic.center;
      village.position = this.basic.position;

      return this.controller.Village.Create(village.id, village);
    }
    return false;
  }
  remove(id: string) {
    if (this.basic) {
      return this.controller.Village.Remove(id);
    }
    return false;
  }
}
