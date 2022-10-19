import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonFlatNode } from 'src/app/components/common-tree/common-flat-node.model';
import { RegionTreeSource } from 'src/app/components/region-tree/region-tree.converter';
import { EnumHelper } from 'src/app/enums/enum-helper';
import { RegionTreeItemType } from 'src/app/enums/region-tree.enum';
import { SelectStrategy } from 'src/app/enums/select-strategy.enum';
import { RegionNode } from 'src/app/models/region-node.model';
import { Region } from 'src/app/models/region.model';
import { Camera } from 'src/app/models/resource/camera.resource';
import { Resource } from 'src/app/models/resource/resource.model';
import { SelectItem } from 'src/app/models/select-control.model';
import { Language } from 'src/app/tools/language';
import { RegionNodeMatchBusiness } from './region-node-match.business';
import {
  RegionNodeMatchSearch,
  RegionNodeResourceModel,
} from './region-node-match.model';

@Component({
  selector: 'region-node-match',
  templateUrl: './region-node-match.component.html',
  styleUrls: ['./region-node-match.component.less'],
  providers: [RegionNodeMatchBusiness],
})
export class RegionNodeMatchComponent implements OnInit {
  regionSelectStrategy = SelectStrategy.Single;
  resourceSelectStrategy = SelectStrategy.Multiple;
  disableItemType = RegionTreeItemType.RegionNode;

  // 区域池
  selectedRegionTreeResource: RegionTreeSource | null = null;

  // 摄像机池
  selectedResources: Resource[] = [];

  searchInfo: RegionNodeMatchSearch = {
    Name: '',
  };
  dataSource: RegionNodeResourceModel[] = [];
  constructor(
    private _business: RegionNodeMatchBusiness,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this._init();
  }

  private async _init() {
    let res = await this._business.init(this.searchInfo);
    this.dataSource = res.Data;
  }

  selectRegionTreeNode(nodes: CommonFlatNode<RegionTreeSource>[]) {
    console.log('区域树', nodes);
    if (nodes.length) this.selectedRegionTreeResource = nodes[0].RawData;
  }
  selectResourceTreeNode(nodes: CommonFlatNode<Resource>[]) {
    console.log('摄像机树', nodes);
    this.selectedResources = nodes.map((node) => node.RawData);
  }

  createRegionNode() {
    if (this.selectedResources.length == 0) {
      this._toastrService.error('请选择摄像机');
      return;
    }
    if (
      !this.selectedRegionTreeResource ||
      this.selectedRegionTreeResource instanceof RegionNode
    ) {
      this._toastrService.error('请选择一个区域');
      return;
    }

    console.log(this.selectedRegionTreeResource);

    for (let i = 0; i < this.selectedResources.length; i++) {
      let resource = this.selectedResources[i] as Camera;

      let regionNode = new RegionNode();
      regionNode.Id = '';
      regionNode.Name = resource.Name;
      regionNode.NodeType = EnumHelper.ConvertCameraTypeToNodeType(
        resource.CameraType
      );
      regionNode.RegionId = this.selectedRegionTreeResource.Id;
      regionNode.ResourceId = resource.Id;
      regionNode.ResourceType = resource.ResourceType;

      this._business.addRegionNode(regionNode);
    }
  }
  deleteRegionNode() {
    console.log(this.selectedRegionTreeResource);

    if (!this.selectedRegionTreeResource) {
      this._toastrService.error('请选择节点');
      return;
    }
    if (this.selectedRegionTreeResource instanceof Region) {
    } else if (this.selectedRegionTreeResource instanceof RegionNode) {
      this._business.deleteRegionNode(
        this.selectedRegionTreeResource.RegionId,
        this.selectedRegionTreeResource.Id
      );
    }
  }
}
