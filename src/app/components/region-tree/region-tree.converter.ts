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
  constructor(private resourceRequest: ResourceRequestSerivce) {
    super();
  }
  Convert(source: RegionTreeSource, setting: boolean) {
    if (source instanceof Region) {
      return this._fromRegion(source);
    } else if (source instanceof RegionNode) {
      return this._fromRegionNode(source, setting);
    }

    throw new Error('Method not implemented.');
  }

  private async _fromRegion(item: Region): Promise<CommonNestNode<Region>> {
    const node = new CommonNestNode();
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
    item: RegionNode,
    setting: boolean
  ): Promise<CommonNestNode<CameraRegionNode>> {
    const node = new CommonNestNode();
    node.Id = item.Id;
    node.Name = item.Name;
    node.ParentId = item.RegionId;
    node.ChildrenLoaded = true;
    node.ParentNode = null;
    node.IconClass = 'howell-icon-video blue-text';

    let plain = classToPlain(item);
    let cameraRegionNode = plainToClass(CameraRegionNode, plain);
    let camera = await this.resourceRequest.get(item.ResourceId);
    cameraRegionNode.Camera = camera;

    node.RawData = cameraRegionNode;

    if (setting) {
      if (camera.GisPoint) {
        node.ButtonIconClasses = [IconTypeEnum.unlink];
      } else {
        node.ButtonIconClasses = [IconTypeEnum.link];
      }
    } else {
    }

    return node;
  }
}
