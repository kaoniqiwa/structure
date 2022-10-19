import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonFlatNode } from 'src/app/components/common-tree/common-flat-node.model';
import { RegionTreeSource } from 'src/app/components/region-tree/region-tree.converter';
import { EnumHelper } from 'src/app/enums/enum-helper';
import { RegionTreeItemType } from 'src/app/enums/region-tree.enum';
import { SelectStrategy } from 'src/app/enums/select-strategy.enum';
import { TableSelectStateEnum } from 'src/app/enums/table-select-state.enum';
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
  selection = new SelectionModel<RegionNodeResourceModel>(true);

  highLight = (model: RegionNodeResourceModel) => {
    return this.selection.isSelected(model);
  };

  load: EventEmitter<void> = new EventEmitter();

  MatchState = MatchState;

  state = MatchState.Add;

  selectStrategy = SelectStrategy.Single;
  resourceSelectStrategy = SelectStrategy.Multiple;
  disableItemType = RegionTreeItemType.RegionNode;

  // 区域池
  treeNodes: CommonFlatNode<RegionTreeSource>[] = [];

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
    // console.log(res);
  }
  changeToDelete() {
    this.state = MatchState.Delete;
    this.selectStrategy = SelectStrategy.Multiple;
  }
  changeToCreate() {
    this.state = MatchState.Add;

    this.selectStrategy = SelectStrategy.Single;
  }
  selectResource(model: RegionNodeResourceModel) {
    this.selection.toggle(model);
  }

  tableSelect(type: TableSelectStateEnum) {
    switch (type) {
      case TableSelectStateEnum.All:
        this.selection.select(...this.dataSource);
        break;
      case TableSelectStateEnum.Reverse:
        this.dataSource.forEach((model) => this.selection.toggle(model));

        break;
      case TableSelectStateEnum.Cancel:
        this.selection.clear();

        break;
      default:
        throw new TypeError('类型错误');
    }
  }

  selectRegionTreeNode(nodes: CommonFlatNode<RegionTreeSource>[]) {
    console.log('区域树', nodes);
    this.treeNodes = nodes;
  }

  async createRegionNode() {
    if (this.selection.isEmpty()) {
      this._toastrService.error('请选择摄像机');
      return;
    }
    if (!this.treeNodes.length) {
      this._toastrService.error('请选择一个区域');
      return;
    }
    let region = this.treeNodes[0];
    let promiseArr: Promise<any>[] = [];
    for (let i = 0; i < this.selection.selected.length; i++) {
      let resource = this.selection.selected[i];
      let regionNode = new RegionNode();
      regionNode.Id = '';
      regionNode.Name = resource.Name;
      regionNode.RegionId = region.Id;
      regionNode.ResourceId = resource.Id;
      regionNode.ResourceType = resource.ResourceType;
      if (resource instanceof Camera) {
        regionNode.NodeType = EnumHelper.ConvertCameraTypeToNodeType(
          resource.CameraType
        );
      }
      promiseArr.push(this._business.addRegionNode(regionNode));
    }
    let res = await Promise.all(promiseArr);
    console.log(res);
    if (res) {
      this._toastrService.success('创建成功');
      this.selection.clear();
      this.load.emit();
    }
  }
  async deleteRegionNode() {
    console.log(this.treeNodes);
    let regionNodes: RegionNode[] = [];
    let promiseArr: Promise<any>[] = [];

    for (let i = 0; i < this.treeNodes.length; i++) {
      let node = this.treeNodes[i];
      let rawData = node.RawData;

      if (rawData instanceof RegionNode) {
        regionNodes.push(rawData);
        promiseArr.push(
          this._business.deleteRegionNode(rawData.RegionId, rawData.Id)
        );
      }
    }
    let res = await Promise.all(promiseArr);
    if (res) {
      this._toastrService.success('删除成功');
      this.load.emit();
    }
  }
}

enum MatchState {
  Add = 0,
  Delete = 1,
}
