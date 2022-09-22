import { Injectable } from '@angular/core';
import { RegionRequestSerivce } from 'src/app/network/request/regions/regions.service';
import { ResourceRequestSerivce } from 'src/app/network/request/resources/resources.service';

@Injectable()
export class MapControlBusiness {
  constructor(private service: ResourceRequestSerivce) {}

  getCamera(id: string) {
    return this.service.get(id);
  }
}
