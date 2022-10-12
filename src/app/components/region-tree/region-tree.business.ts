import { Injectable } from '@angular/core';
import { RegionTreeConverter } from 'src/app/components/region-tree/region-tree.converter';
import { RegionNode } from 'src/app/models/region-node.model';
import { Region } from 'src/app/models/region.model';
import {
  GetRegionNodesParams,
  GetRegionsParams,
} from 'src/app/network/request/regions/regions.params';
import { RegionRequestSerivce } from 'src/app/network/request/regions/regions.service';
import { CommonNestNode } from '../common-tree/common-nest-node.model';

@Injectable()
export class RegionTreeBusiness {
  public nestedNodeMap = new Map<string, CommonNestNode<Region>>();
  public showRegionNode = false;

  private _nodes: CommonNestNode[] = [];

  private _regions: Region[] = [];
  private _regionNodes: RegionNode[] = [];

  constructor(
    private _regionRequest: RegionRequestSerivce,
    private _converter: RegionTreeConverter
  ) {}

  async init(condition: string = '') {
    this.nestedNodeMap.clear();

    // 拉取所有区域
    let params = new GetRegionsParams();
    params.Name = condition;

    let regionRes = await this._listRegion(params);
    this._regions = regionRes.Data;
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
      params.Name = condition;
      let regionNodeRes = await this._listRegionNode(params);

      console.log(regionNodeRes);
      this._regionNodes = regionNodeRes.Data;
      let nodes2 = await this._converter.iterateToNestNode(regionNodeRes.Data);
      this._registerArray(nodes2);

      for (let node of nodes2) {
        if (node.ParentId) {
          if (!this.nestedNodeMap.has(node.ParentId)) {
            await this._getAncestors(node);
          }
        }
      }
    }

    let allNodes = Array.from(this.nestedNodeMap.values());

    // console.log(allNodes);
    this._nodes = allNodes;

    let res = this._converter.buildNestTree(allNodes);
    return res;
  }

  searchNode(condition: string) {
    return this.init(condition);
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
  private _getLocalAncestors(item: Region, res: Region[]) {
    if (item.ParentId) {
      let parent = this._regions.find((v) => v.Id == item.ParentId);
      if (parent) {
        if (!res.includes(parent)) res.push(parent);
        this._getLocalAncestors(parent, res);
      }
    }
  }
}
