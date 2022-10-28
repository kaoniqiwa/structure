import { Injectable } from '@angular/core';
import { CommonNestNode } from '../common-tree/common-nest-node.model';
import { RegionType } from '../../enums/region-type.enum';
import { CameraRegionNode, RegionNode } from '../../models/region-node.model';
import { Region } from '../../models/region.model';
import { CommonTreeConverter } from '../common-tree/common-tree.converter';
import { CommonTreePromiseConverter } from '../common-tree/common-tree-promise.converter';
import { ResourceRequestSerivce } from 'src/app/network/request/resources/resources.service';
import { IconTypeEnum } from 'src/app/enums/icon-type.enum';
import { classToClass, classToPlain, plainToClass } from 'class-transformer';
import { OnlineStatus } from 'src/app/enums/online-status.enum';
import { RegionNodeType } from 'src/app/enums/region-node-type.enum';
import { Language } from 'src/app/tools/language';
import { SuffixIconType } from 'src/app/enums/region-tree.enum';
import { Camera } from 'src/app/models/resource/camera.resource';
import { GetCamerasParams } from 'src/app/network/request/resources/resources.params';

const RegionNodeIconType = new Map([
  [RegionType.None, 'howell-icon-earth'],
  [RegionType.Normal, 'howell-icon-earth'],
  [RegionType.Leaf, 'howell-icon-map5'],
]);

export type RegionTreeSource = Region | RegionNode;

@Injectable({
  providedIn: 'root',
})
export class RegionTreeConverter extends CommonTreePromiseConverter {
  private _resourceMap = new Map<string, Camera>();

  constructor(private resourceRequest: ResourceRequestSerivce) {
    super();
    this.listResource();
  }
  Convert(source: RegionTreeSource) {
    if (source instanceof Region) {
      return this._fromRegion(source);
    } else if (source instanceof RegionNode) {
      return this._fromRegionNode(source);
    }

    throw new Error('Method not implemented.');
  }

  private async _fromRegion(item: Region): Promise<CommonNestNode<Region>> {
    const node = new CommonNestNode<Region>();
    node.Id = item.Id;
    node.Name = item.Name;
    node.HasChildren = false;
    node.ParentId = item.ParentId;
    node.ChildrenLoaded = true;
    node.ParentNode = null;
    node.IconClass = item.ParentId ? 'howell-icon-map5' : 'howell-icon-earth';
    node.RawData = item;
    return node;
  }
  private async _fromRegionNode(
    item: RegionNode
  ): Promise<CommonNestNode<CameraRegionNode>> {
    const node = new CommonNestNode<CameraRegionNode>();
    node.Id = item.Id;
    node.Name = item.Name;
    node.ParentId = item.RegionId;
    node.ChildrenLoaded = true;
    node.ParentNode = null;

    node.IconClass = 'blue-text ' + Language.RegionNodeIcon(item.NodeType);

    let plain = classToPlain(item);
    let cameraRegionNode = plainToClass(CameraRegionNode, plain);

    cameraRegionNode.getCamera = (cameraId: string) => {
      return this.resourceRequest.get(cameraId);
    };
    cameraRegionNode.camera = this._resourceMap.get(item.ResourceId);

    node.RawData = cameraRegionNode;

    return node;
  }

  async listResource() {
    this._resourceMap.clear();

    let params: GetCamerasParams = new GetCamerasParams();
    let { Data: resources } = await this.resourceRequest.list(params);

    resources.map((resource) => {
      if (!this._resourceMap.has(resource.Id))
        this._resourceMap.set(resource.Id, resource);
    });
  }
}
