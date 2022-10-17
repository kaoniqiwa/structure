import { Injectable } from '@angular/core';
import { data, param } from 'jquery';
import { RegionNodeType } from 'src/app/enums/region-node-type.enum';
import { PagedList } from 'src/app/models/page-list.model';
import { RegionNode } from 'src/app/models/region-node.model';
import { Camera } from 'src/app/models/resource/camera.resource';
import { GetRegionNodesParams } from 'src/app/network/request/regions/regions.params';
import { RegionRequestSerivce } from 'src/app/network/request/regions/regions.service';
import { GetCamerasParams } from 'src/app/network/request/resources/resources.params';
import { ResourceRequestSerivce } from 'src/app/network/request/resources/resources.service';
import { RegionNodeOperateConverter } from './region-node-operate.converter';
import {
  RegionNodeResource,
  RegionNodeOperateModel,
  RegionNodeOperateSearch,
  RegionNodeOperateModel2,
} from './region-node-operate.model';

@Injectable()
export class RegionNodeOperateBusiness {
  constructor(
    private _regionRequestSerivce: RegionRequestSerivce,
    private _resourceRequest: ResourceRequestSerivce,
    private _converter: RegionNodeOperateConverter
  ) {}

  async init(searchInfo: RegionNodeOperateSearch) {
    let model = new RegionNodeOperateModel();
    let model2 = new RegionNodeOperateModel2();

    if (searchInfo.RegionId && searchInfo.RegionNodeId) {
      let regionNode = await this.getRegionNode(
        searchInfo.RegionId,
        searchInfo.RegionNodeId
      );
      model.Id = regionNode.Id;
      model.Name = regionNode.Name;
      model.RegionNodeType = regionNode.NodeType ?? RegionNodeType.camera;
      model.ResourceId = regionNode.ResourceId;

      model2.RegionNode = regionNode;
    }

    let { Data: allResources, Page } = await this._listResource(
      searchInfo.Name,
      searchInfo.PageIndex,
      searchInfo.PageSize
    );

    console.log(allResources);
    let resourceData = this._converter.iterateToModel(allResources);

    resourceData.forEach((resource) => {
      resource.IsBind = '';
      if (resource.Id == model.ResourceId) {
        resource.IsBind = '已绑定';
      }
    });

    let res: PagedList<RegionNodeResource> = {
      Page: Page,
      Data: resourceData,
    };
    model.ResourceList = res;

    return model;
  }
  private _listResource(name: string, pageIndex: number = 1, pageSize = 9) {
    let params: GetCamerasParams = new GetCamerasParams();
    params.Name = name;
    params.PageIndex = pageIndex;
    params.PageSize = pageSize;
    return this._resourceRequest.list(params);
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
  async listAvailableCameras() {}
}
