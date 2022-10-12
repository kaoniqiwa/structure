import { Injectable } from '@angular/core';
import { RegionNode } from 'src/app/models/region-node.model';
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
  getRegionNode(regionId: string, regionNodeId: string) {
    return this._regionRequestSerivce.node.get(regionId, regionNodeId);
  }
  addRegionNode(regionNode: RegionNode) {
    return this._regionRequestSerivce.node.create(regionNode);
  }
  updateRegionNode(regionNode: RegionNode) {
    return this._regionRequestSerivce.node.set(regionNode);
  }
  getCamera(id: string) {
    return this._resourceRequest.get(id);
  }
}
