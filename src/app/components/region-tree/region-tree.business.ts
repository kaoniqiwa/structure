import { Injectable } from '@angular/core';
import { RegionTreeConverter } from 'src/app/components/region-tree/region-tree.converter';
import { IconTypeEnum } from 'src/app/enums/icon-type.enum';
import { OnlineStatus } from 'src/app/enums/online-status.enum';
import { RegionNodeType } from 'src/app/enums/region-node-type.enum';
import {
  RegionTreeItemType,
  SuffixIconType,
} from 'src/app/enums/region-tree.enum';
import { CameraRegionNode, RegionNode } from 'src/app/models/region-node.model';
import { Region } from 'src/app/models/region.model';
import {
  GetRegionNodesParams,
  GetRegionsParams,
} from 'src/app/network/request/regions/regions.params';
import { RegionRequestSerivce } from 'src/app/network/request/regions/regions.service';
import { CommonNestNode } from '../common-tree/common-nest-node.model';
import { RegionTreeSearch } from './region-tree.model';

@Injectable()
export class RegionTreeBusiness {
  public nestedNodeMap = new Map<string, CommonNestNode<Region>>();
  public showRegionNode = false;
  public suffixIconType = SuffixIconType.None;

  public disableItemType = RegionTreeItemType.None;

  public rawNodes: CommonNestNode[] = [];

  constructor(
    private _regionRequest: RegionRequestSerivce,
    private _converter: RegionTreeConverter
  ) {}

  async init(searchInfo: RegionTreeSearch) {
    this.nestedNodeMap.clear();
    this.rawNodes = [];

    // 拉取所有区域
    let params = new GetRegionsParams();
    params.Name = searchInfo.Name;

    let regionRes = await this._listRegion(params);
    regionRes.Data = regionRes.Data.sort((a, b) => {
      return a.Name.localeCompare(b.Name) || a.Name.length - b.Name.length;
    });
    let nodes = await this._converter.iterateToNestNode(regionRes.Data);
    this._registerArray(nodes);
    for (let node of nodes) {
      if (node.ParentId) {
        if (!this.nestedNodeMap.has(node.ParentId)) {
          await this._getAncestors(node);
        }
      }
    }

    if (this.showRegionNode) {
      // 拉取所有区域节点
      let params = new GetRegionNodesParams();
      params.Name = searchInfo.Name;
      params.NodeType = searchInfo.RegionNodeType;
      let regionNodeRes = await this._listRegionNode(params);

      regionNodeRes.Data = regionNodeRes.Data.sort((a, b) => {
        return a.Name.localeCompare(b.Name) || a.Name.length - b.Name.length;
      });

      // console.log(regionNodeRes);
      let nodes2 = await this._converter.iterateToNestNode(regionNodeRes.Data);

      if (this.suffixIconType == SuffixIconType.Status) {
        nodes2.forEach((node) => {
          let item = node.RawData;
          node.ButtonIconClasses = [
            item.OnlineStatus === OnlineStatus.online
              ? `${IconTypeEnum.online} green-text`
              : `${IconTypeEnum.offline} powder-red-text`,
            IconTypeEnum.play,
            IconTypeEnum.position,
          ];
        });
      } else if (this.suffixIconType == SuffixIconType.Bind) {
        for (let i = 0; i < nodes2.length; i++) {
          const node = nodes2[i];
          let camera = await node.RawData.getCamera(node.RawData.ResourceId);
          if (camera.GisPoint) {
            node.ButtonIconClasses = [IconTypeEnum.unlink];
          } else {
            node.ButtonIconClasses = [IconTypeEnum.link];
          }
        }
      }

      this._registerArray(nodes2);

      for (let node of nodes2) {
        if (node.ParentId) {
          if (!this.nestedNodeMap.has(node.ParentId)) {
            await this._getAncestors(node);
          }
        }
      }
    }

    this.rawNodes = Array.from(this.nestedNodeMap.values());

    this.rawNodes.forEach((node) => {
      switch (this.disableItemType) {
        case RegionTreeItemType.All:
          node.Clickable = false;
          break;
        case RegionTreeItemType.Region:
          if (node.RawData instanceof Region) {
            node.Clickable = false;
          }
          break;
        case RegionTreeItemType.RegionNode:
          if (node.RawData instanceof RegionNode) {
            node.Clickable = false;
          }
          break;
        default:
          break;
      }
    });

    // console.log('rawNodes', this.rawNodes);
    let res = this._converter.buildNestTree(this.rawNodes);
    return res;
  }

  searchNode(searchInfo: RegionTreeSearch) {
    return this.init(searchInfo);
  }

  private _listRegion(params: GetRegionsParams) {
    return this._regionRequest.list(params);
  }

  private _listRegionNode(params: GetRegionNodesParams) {
    return this._regionRequest.node.list(params);
  }
  private _registerArray(nodes: CommonNestNode[]) {
    for (let i = 0; i < nodes.length; i++) {
      let node = nodes[i];
      // 一定要直接覆盖，保证 node 为最新
      this.nestedNodeMap.set(node.Id, node);
    }
  }

  private _registerRecurs(nodes: CommonNestNode[]) {
    for (let i = 0; i < nodes.length; i++) {
      let node = nodes[i];
      this.nestedNodeMap.set(node.Id, node);
      if (node.childrenChange.value.length > 0) {
        this._registerRecurs(node.childrenChange.value);
      }
    }
  }

  private async _getAncestors(node: CommonNestNode) {
    if (node.ParentId && !this.nestedNodeMap.has(node.ParentId)) {
      let region = await this._regionRequest.get(node.ParentId);
      let parentNode = await this._converter.Convert(region);
      this._registerArray([parentNode]);
      // 一定要await
      await this._getAncestors(parentNode);
    }
  }
}
