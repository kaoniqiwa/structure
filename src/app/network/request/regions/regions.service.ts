import { Injectable } from '@angular/core';
import { RegionNode } from 'src/app/models/region-node.model';
import { Region } from 'src/app/models/region.model';
import {
  BaseRequestService,
  BaseTypeRequestService,
} from '../../base-request.service';
import { HowellAuthHttpService } from '../../howell-auth-http.service';
import { RegionsUrl } from '../../url/regions/regions.url';
import { GetRegionNodesParams, GetRegionsParams } from './regions.params';

@Injectable({
  providedIn: 'root',
})
export class RegionRequestSerivce {
  private basic: BaseRequestService;
  private type: BaseTypeRequestService<Region>;

  constructor(http: HowellAuthHttpService) {
    this.basic = new BaseRequestService(http);
    this.type = this.basic.type(Region);
  }

  create(item: Region) {
    return this.type.post(RegionsUrl.basic(), item);
  }
  list(params: GetRegionsParams = new GetRegionsParams()) {
    return this.type.paged(RegionsUrl.list(), params);
  }
  get(id: string): Promise<Region> {
    return this.type.get(RegionsUrl.item(id));
  }
  set(item: Region) {
    return this.type.put(RegionsUrl.item(item.Id), item);
  }
  delete(id: string) {
    return this.type.delete(RegionsUrl.item(id));
  }

  private _node?: RegionsNodesRequestService;
  public get node(): RegionsNodesRequestService {
    if (!this._node) {
      this._node = new RegionsNodesRequestService(this.basic);
    }
    return this._node;
  }
}

class RegionsNodesRequestService {
  constructor(basic: BaseRequestService) {
    this.type = basic.type(RegionNode);
  }
  type: BaseTypeRequestService<RegionNode>;
  array(regionId: string) {
    let url = RegionsUrl.node(regionId).basic();
    return this.type.getArray(url);
  }
  create(node: RegionNode) {
    let url = RegionsUrl.node(node.RegionId).basic();
    return this.type.post(url, node);
  }
  get(regionId: string, nodeId: string): Promise<RegionNode> {
    let url = RegionsUrl.node(regionId).item(nodeId);
    return this.type.get(url);
  }
  set(node: RegionNode) {
    let url = RegionsUrl.node(node.RegionId).item(node.Id);
    return this.type.put(url, node);
  }
  delete(regionId: string, nodeId: string) {
    let url = RegionsUrl.node(regionId).item(nodeId);
    return this.type.delete(url);
  }
  list(params: GetRegionNodesParams = new GetRegionNodesParams()) {
    let url = RegionsUrl.node().list();
    return this.type.paged(url, params);
  }
  async all() {
    let paged = await this.list();
    return paged.Data;
  }
}
