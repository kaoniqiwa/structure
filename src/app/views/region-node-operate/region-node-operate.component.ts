import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { CommonTableComponent } from 'src/app/components/common-table/common.component';
import { TableColumnModel } from 'src/app/components/common-table/table.model';
import { FormState } from 'src/app/enums/form-state.enum';
import { RegionNodeType } from 'src/app/enums/region-node-type.enum';
import { SelectStrategy } from 'src/app/enums/select-strategy.enum';
import { Page } from 'src/app/models/page-list.model';
import { RegionNode } from 'src/app/models/region-node.model';
import { Language } from 'src/app/tools/language';
import { RegionNodeOperateBusiness } from './region-node-operate.business';
import { REGION_NODE_TABLE } from './region-node-operate.config';
import {
  RegionNodeOperateModel,
  RegionNodeOperateSearch,
  RegionNodeResource,
} from './region-node-operate.model';

@Component({
  selector: 'region-node-operate',
  templateUrl: './region-node-operate.component.html',
  styleUrls: ['./region-node-operate.component.less'],
  providers: [RegionNodeOperateBusiness],
})
export class RegionNodeOperateComponent implements OnInit {
  @Input()
  regionId: string = '';

  @Input()
  regionNodeId: string = '';

  @Input()
  state: FormState = FormState.none;

  @Output()
  closeEvent = new EventEmitter<boolean>();

  @ViewChild('table') table?: CommonTableComponent;

  FormState = FormState;
  RegionNodeType = RegionNodeType;
  Language = Language;

  // Paginator
  page: Page = {
    PageIndex: 0,
    PageSize: 0,
    RecordCount: 0,
    TotalRecordCount: 0,
    PageCount: 0,
  };

  searchInfo: RegionNodeOperateSearch = {
    RegionId: '',
    RegionNodeId: '',
    Name: '',
    PageIndex: 1,
    PageSize: 9,
  };

  selectStrategy = SelectStrategy.Single;
  selectedRows: RegionNodeResource[] = [];
  dataSource = new BehaviorSubject<RegionNodeResource[]>([]);
  columnModel: TableColumnModel[] = [...REGION_NODE_TABLE]; // 表格列配置详情
  displayedColumns: string[] = this.columnModel.map((model) => model.columnDef);

  model: RegionNodeOperateModel = new RegionNodeOperateModel();

  get title() {
    if (this.state == FormState.add) {
      return '添加监控点';
    } else if (this.state == FormState.edit) {
      return '编辑监控点';
    }
    return '';
  }

  constructor(
    private _business: RegionNodeOperateBusiness,
    private _fb: FormBuilder,
    private _toastrService: ToastrService
  ) {}
  async ngOnInit() {
    this.searchInfo.RegionId = this.regionId;
    this.searchInfo.RegionNodeId = this.regionNodeId;
    this._init();
  }
  private async _init() {
    this.model = await this._business.init(this.searchInfo);
    console.log(this.model);
    this.dataSource.next(this.model.ResourceList.Data);
    this.page = this.model.ResourceList.Page;
  }
  pageEvent(pageInfo: PageEvent) {
    if (this.searchInfo.PageIndex == pageInfo.pageIndex + 1) return;
    this.searchInfo.PageIndex = pageInfo.pageIndex + 1;
    this._init();
  }
  selectAddTableRow(rows: RegionNodeResource[]) {
    this.selectedRows = rows;
  }

  search() {
    this.searchInfo.PageIndex = 1;
    this._init();
  }
  async onSubmit() {
    if (this.state == FormState.add) {
      if (this.selectedRows.length == 0) {
        this._toastrService.warning('请绑定摄像机');
        return;
      }
      let regionNodeResource = this.selectedRows[0];

      console.log(regionNodeResource);
      let regionNode = new RegionNode();
      regionNode.Id = '';
      regionNode.Name = this.model.Name;
      regionNode.NodeType = this.model.RegionNodeType;
      regionNode.RegionId = this.searchInfo.RegionId;
      regionNode.ResourceId = regionNodeResource.Id;
      regionNode.ResourceType = regionNodeResource.ResourceType;

      let res = await this._business.addRegionNode(regionNode);

      if (res) {
        this._toastrService.success('操作成功');
        this.closeEvent.emit(true);
      }
    } else if (this.state == FormState.edit) {
      // if (this.regionNode) {
      //   this.regionNode.Name = this.regionNodeName;
      //   this.regionNode.NodeType = this.regionNodeType;
      //   let res = await this._business.updateRegionNode(this.regionNode);
      //   console.log(res);
      //   if (res) {
      //     this._toastrService.success('操作成功');
      //     this.closeEvent.emit(true);
      //   }
      // }
    }
  }
  onReset() {
    this.closeEvent.emit(false);
  }
}
