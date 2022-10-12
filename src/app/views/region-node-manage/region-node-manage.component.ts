import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { CommonTableComponent } from 'src/app/components/common-table/common.component';
import {
  TableColumnModel,
  TableOperateModel,
} from 'src/app/components/common-table/table.model';
import { CommonFlatNode } from 'src/app/components/common-tree/common-flat-node.model';
import { ConfirmDialogModel } from 'src/app/components/confirm-dialog/confirm-dialog.model';
import { PaginatorComponent } from 'src/app/components/paginator/paginator.component';
import { RegionTreeComponent } from 'src/app/components/region-tree/region-tree.component';
import { RegionTreeSource } from 'src/app/components/region-tree/region-tree.converter';
import { DialogEnum } from 'src/app/enums/dialog.enum';
import { EnumHelper } from 'src/app/enums/enum-helper';
import { FormState } from 'src/app/enums/form-state.enum';
import { SelectStrategy } from 'src/app/enums/select-strategy.enum';
import { TableSelectStateEnum } from 'src/app/enums/table-select-state.enum';
import { UserResourceType } from 'src/app/enums/user-resource-type.enum';
import { Page } from 'src/app/models/page-list.model';
import { RegionNodeManageBusiness } from './region-node-manage.business';
import { GarbageStationManageConf } from './region-node-manage.config';
import { RegionNodeManageModel } from './region-node-manage.model';

@Component({
  selector: 'region-node-manage',
  templateUrl: './region-node-manage.component.html',
  styleUrls: ['./region-node-manage.component.less'],
  providers: [RegionNodeManageBusiness],
})
export class RegionNodeManageComponent implements OnInit {
  private _pageSize = 9;
  private _condition = '';
  private _currentNode?: CommonFlatNode<RegionTreeSource>;

  //Table
  dataSubject = new BehaviorSubject<RegionNodeManageModel[]>([]);
  selectStrategy = SelectStrategy.Multiple;
  columnModel: TableColumnModel[] = [...GarbageStationManageConf]; // 表格列配置详情
  displayedColumns: string[] = this.columnModel.map((model) => model.columnDef); // 表格列 id
  tableOperates: TableOperateModel[] = [];

  selectedRows: RegionNodeManageModel[] = []; //table选中项
  willBeDeleted: RegionNodeManageModel[] = [];

  // Paginator
  pagerCount: number = 4;
  pageIndex = 1;
  page: Page = {
    PageIndex: this.pageIndex,
    PageSize: this._pageSize,
    RecordCount: 0,
    TotalRecordCount: 0,
    PageCount: 0,
  };

  // 对话框
  showOperate = false;
  showConfirm = false;
  dialogModel = new ConfirmDialogModel('确认删除', '删除该项');

  // 表单
  state = FormState.none;
  stationId = '';
  regionId = '';

  @ViewChild(CommonTableComponent) table?: CommonTableComponent;
  @ViewChild(PaginatorComponent) paginator?: PaginatorComponent;

  get enableAddBtn() {
    return this._currentNode;
  }

  get enableDelBtn() {
    return !!this.selectedRows.length;
  }

  @ViewChild(RegionTreeComponent) tree?: RegionTreeComponent;

  constructor(
    private _business: RegionNodeManageBusiness,
    private _toastrService: ToastrService
  ) {
    this.tableOperates.push(
      new TableOperateModel(
        'edit',
        ['howell-icon-modification'],
        '编辑',
        this._clickEditBtn.bind(this)
      )
    );
  }

  async ngOnInit() {
    // let res = await this._business.listStations();
    // console.log(res);
    // this.page = res.Page;
    // this.dataSubject.next(res.Data);
  }

  private async _init() {
    if (this._currentNode) {
      let res = await this._business.listRegionNode(
        this._currentNode.Id,
        this._condition,
        this.pageIndex,
        this._pageSize
      );
      // console.log(res);
      this.page = res.Page;
      this.dataSubject.next(res.Data);
    }
  }

  // 点击树节点
  selectTreeNode(nodes: CommonFlatNode<RegionTreeSource>[]) {
    this._currentNode = nodes[0];
    // console.log('外部结果', nodes);
    this._updateTable();
  }

  selectTableRow(rows: RegionNodeManageModel[]) {
    this.selectedRows = rows;
  }

  async searchEvent(condition: string) {
    this._condition = condition;
    this.pageIndex = 1;
    this._init();
  }
  tableSelect(type: TableSelectStateEnum) {
    if (this.table) {
      switch (type) {
        case TableSelectStateEnum.All:
          this.table.selectAll();
          break;
        case TableSelectStateEnum.Reverse:
          this.table.selectReverse();
          break;
        case TableSelectStateEnum.Cancel:
          this.table.selectCancel();
          break;
        default:
          throw new TypeError('类型错误');
      }
    }
  }
  pageEvent(pageInfo: PageEvent) {
    if (this.pageIndex == pageInfo.pageIndex + 1) return;
    this.pageIndex = pageInfo.pageIndex + 1;
    this._init();
  }

  closeEvent(update: boolean) {
    this.showOperate = false;
    this.state = FormState.none;

    if (update) {
      this.pageIndex = 1;
      this._init();
    }
  }

  dialogMsgEvent(status: DialogEnum) {
    this.showConfirm = false;
    if (status == DialogEnum.confirm) {
      this._deleteRows(this.willBeDeleted);
    } else if (status == DialogEnum.cancel) {
    }
  }
  addBtnClick() {
    this.state = FormState.add;
    this.showOperate = true;
  }
  deleteBtnClick() {
    this.willBeDeleted = [...this.selectedRows];
    this.showConfirm = true;
    this.dialogModel.content = `删除${this.willBeDeleted.length}个选项?`;
  }

  private async _deleteRows(rows: RegionNodeManageModel[]) {
    // this.table?.deleteRows(rows);
    // for (let i = 0; i < rows.length; i++) {
    //   let id = rows[i].Id;
    //   await this._business.delete(id);
    //   this._toastrService.success('删除成功');
    // }
    // this.pageIndex = 1;
    // this._init();
  }

  private async _updateTable() {
    if (this._currentNode) {
      this._init();
      this.regionId = this._currentNode.Id;
    } else {
      this.page = {
        PageIndex: this.pageIndex,
        PageSize: this._pageSize,
        RecordCount: 0,
        TotalRecordCount: 0,
        PageCount: 0,
      };
      this.regionId = '';
      this.dataSubject.next([]);
    }
  }
  private _clickEditBtn(row: RegionNodeManageModel) {
    this.showOperate = true;
    this.state = FormState.edit;
    this.stationId = row.Id;
  }
}
