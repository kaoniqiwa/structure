import { Injectable } from '@angular/core';
import { PagedList } from 'src/app/models/page-list.model';
import { RegionNode } from 'src/app/models/region-node.model';
import { RegionRequestSerivce } from 'src/app/network/request/regions/regions.service';
import { GetCamerasParams } from 'src/app/network/request/resources/resources.params';
import { ResourceRequestSerivce } from 'src/app/network/request/resources/resources.service';
import { RegionNodeResourceConverter } from './region-node-match.converter';
import {
  RegionNodeMatchSearch,
  RegionNodeResourceModel,
} from './region-node-match.model';

@Injectable()
export class RegionNodeMatchBusiness {
  constructor(
    private _regionRequest: RegionRequestSerivce,
    private _resourceRequest: ResourceRequestSerivce,
    private _converter: RegionNodeResourceConverter
  ) {}

  async init(searchInfo: RegionNodeMatchSearch) {
    // let { Data: allResources, Page } = await this.listResource();
    // let resourceData = this._converter.iterateToModel(allResources);
    // let res: PagedList<RegionNodeResourceModel> = {
    //   Page: Page,
    //   Data: resourceData,
    // };
    // return res;
  }
  async listResource() {
    let params: GetCamerasParams = new GetCamerasParams();
    let { Data: allResources } = await this._resourceRequest.list(params);

    let res = this._converter.iterateToModel(allResources);

    return res;
  }

  addRegionNode(regionNode: RegionNode) {
    return this._regionRequest.node.create(regionNode);
  }
  deleteRegionNode(regionId: string, regionNodeId: string) {
    return this._regionRequest.node.delete(regionId, regionNodeId);
  }
}
