import { Injectable } from '@angular/core';
import { Camera } from 'src/app/models/resource/camera.resource';
import { GetCamerasParams } from 'src/app/network/request/resources/resources.params';
import { ResourceRequestSerivce } from 'src/app/network/request/resources/resources.service';
import { CommonNestNode } from '../common-tree/common-nest-node.model';
import { CameraTreeConverter } from './resource-tree.converter';

@Injectable()
export class ResourceTreeBusiness {
  public nestedNodeMap = new Map<string, CommonNestNode<Camera>>();

  constructor(
    private _resourceRequest: ResourceRequestSerivce,
    private _converter: CameraTreeConverter
  ) {}

  async init(condition: string = '') {
    this.nestedNodeMap.clear();

    let tmp = await this.listResource(condition);

    let res = this._converter.buildNestTree(tmp.Data);
    return res;
  }
  searchNode(condition: string) {
    return this.init(condition);
  }
  listResource(name: string) {
    let params: GetCamerasParams = new GetCamerasParams();
    params.Name = name;
    return this._resourceRequest.list(params);
  }
}
