import { Injectable } from '@angular/core';
import { RegionNode } from 'src/app/models/region-node.model';
import { Region } from 'src/app/models/region.model';
import { Camera } from 'src/app/models/resource/camera.resource';
import { RegionRequestSerivce } from 'src/app/network/request/regions/regions.service';
import { ResourceRequestSerivce } from 'src/app/network/request/resources/resources.service';

@Injectable()
export class DeployMapBusiness {
  constructor(private resourceRequest: ResourceRequestSerivce) {}
  updateCamera(camera: Camera) {
    return this.resourceRequest.set(camera);
  }
  getCamera(resourceId: string) {
    return this.resourceRequest.get(resourceId);
  }
}
