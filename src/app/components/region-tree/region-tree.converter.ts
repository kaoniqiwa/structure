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
  Convert(source: RegionTreeSource) {
    if (source instanceof Region) {
      return this._fromRegion(source);
    } else if (source instanceof RegionNode) {
      return this._fromRegionNode(source);
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
    item: RegionNode
  ): Promise<CommonNestNode<CameraRegionNode>> {
    const node = new CommonNestNode();
    node.Id = item.Id;
    node.Name = item.Name;
    node.ParentId = item.RegionId;
    node.ChildrenLoaded = true;
    node.ParentNode = null;
    let plain = classToPlain(item);
    let cameraRegionNode = plainToClass(CameraRegionNode, plain);
    let camera = await this.resourceRequest.get(item.ResourceId);
    cameraRegionNode.Camera = camera;

    // node.Clickable = false;

    node.IconClass =
      'blue-text ' + Language.RegionNodeIcon(cameraRegionNode.NodeType);

    node.RawData = cameraRegionNode;

    // if (setting) {
    //   if (camera.GisPoint) {
    //     node.ButtonIconClasses = [IconTypeEnum.unlink];
    //   } else {
    //     node.ButtonIconClasses = [IconTypeEnum.link];
    //   }
    // } else {
    //   node.ButtonIconClasses = [
    //     item.OnlineStatus === OnlineStatus.online
    //       ? `${IconTypeEnum.online} green-text`
    //       : `${IconTypeEnum.offline} powder-red-text`,
    //     IconTypeEnum.play,
    //     IconTypeEnum.position,
    //   ];
    // }

    return node;
  }
}
