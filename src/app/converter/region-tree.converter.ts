import { Injectable } from '@angular/core';
import { CommonNestNode } from '../components/common-tree/common-nest-node.model';
import { RegionType } from '../enums/region-type.enum';
import { RegionNode } from '../models/region-node.model';
import { Region } from '../models/region.model';
import { CommonTreeConverter } from './common-tree.converter';

const RegionNodeIconType = new Map([
  [RegionType.None, 'howell-icon-earth'],
  [RegionType.Normal, 'howell-icon-earth'],
  [RegionType.Leaf, 'howell-icon-map5'],
]);

export type RegionTreeSource = Region | RegionNode;

@Injectable({
  providedIn: 'root',
})
export class RegionTreeConverter extends CommonTreeConverter {
  Convert(source: RegionTreeSource, ...res: any[]): CommonNestNode {
    if (source instanceof Region) {
      return this._fromRegion(source);
    } else if (source instanceof RegionNode) {
      return this._fromRegionNode(source);
    }

    throw new Error('Method not implemented.');
  }

  private _fromRegion(item: Region): CommonNestNode<Region> {
    const node = new CommonNestNode();
    node.Id = item.Id;
    node.Name = item.Name;
    node.HasChildren = false;
    node.ParentId = item.ParentId ?? null;
    node.ChildrenLoaded = true;
    node.ParentNode = null;
    node.IconClass = item.ParentId ? 'howell-icon-map5' : 'howell-icon-earth';
    node.RawData = item;
    return node;
  }
  private _fromRegionNode(item: RegionNode): CommonNestNode<RegionNode> {
    const node = new CommonNestNode();
    node.Id = item.Id;
    node.Name = item.Name;
    node.ParentId = item.RegionId;
    node.ChildrenLoaded = true;
    node.ParentNode = null;
    node.IconClass = 'howell-icon-camera';
    node.RawData = item;
    return node;
  }
}
