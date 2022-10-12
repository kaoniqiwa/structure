import { Injectable } from '@angular/core';
import { GetRegionNodesParams } from 'src/app/network/request/regions/regions.params';
import { RegionRequestSerivce } from 'src/app/network/request/regions/regions.service';
import { ResourceRequestSerivce } from 'src/app/network/request/resources/resources.service';

@Injectable()
export class RegionNodeOperateBusiness {
  constructor(
    private _regionRequestSerivce: RegionRequestSerivce,
    private _resourceRequest: ResourceRequestSerivce
  ) {}

  listAllCameras() {
    return this._resourceRequest.list();
  }
  getRegion(regionId: string) {
    let params = new GetRegionNodesParams();
    params.RegionIds = regionId ? [regionId] : [];

    return this._regionRequestSerivce.node.list(params);
  }
}
