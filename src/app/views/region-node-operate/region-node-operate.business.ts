import { Injectable } from '@angular/core';
import { param } from 'jquery';
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
} from './region-node-operate.model';

@Injectable()
export class RegionNodeOperateBusiness {
  constructor(
    private _regionRequestSerivce: RegionRequestSerivce,
    private _resourceRequest: ResourceRequestSerivce,
    private _converter: RegionNodeOperateConverter
  ) {}

  async init(searchInfo: RegionNodeOperateSearch) {
    // let { Data: allCameras } = await this.listAllCameras();
    // let existCameras: Camera[] = [];
    // let model = new RegionNodeOperateModel();
    // if (regionId && regionNodeId) {
    //   let regionNode = await this.getRegionNode(regionId, regionNodeId);
    //   console.log(regionNode);
    //   model.Id = regionNode.Id;
    //   model.Name = regionNode.Name;
    //   model.RegionNodeType = regionNode.NodeType ?? RegionNodeType.camera;
    //   let camera = await this.getCamera(regionNode.ResourceId);
    //   console.log(camera);
    //   existCameras.push(camera);
    // }
    // allCameras.map((camera) => {
    //   let operateCamera = new RegionNodeOperateCamera();
    // });
    // model.ResourceList = allCameras;
    // return model;

    let params = new GetCamerasParams();
    params.PageIndex = searchInfo.PageIndex;
    params.PageSize = searchInfo.PageSize;

    let { Data, Page } = await this._listResource(params);

    console.log(Data);

    this._converter.iterateToModel(Data);

    let res: PagedList<RegionNodeResource> = {
      Page: Page,
      Data: Data,
    };

    return res;
  }
  private _listResource(params: GetCamerasParams = new GetCamerasParams()) {
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
  async listAvailableCameras() {
    let { Data: allCameras } = await this._listResource();
  }
}
