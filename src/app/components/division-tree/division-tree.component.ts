import { SelectionChange } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { SelectStrategy } from 'src/app/enums/select-strategy.enum';
import { CommonFlatNode } from '../common-tree/common-flat-node.model';
import { CommonTree } from '../common-tree/common-tree';
import { CommonTreeComponent } from '../common-tree/common-tree.component';
import { DivisionTreeBusiness } from './division-tree.business';

@Component({
  selector: 'howell-division-tree',
  templateUrl: './division-tree.component.html',
  styleUrls: ['./division-tree.component.less'],
  providers: [
    DivisionTreeBusiness
  ]
})
export class DivisionTreeComponent extends CommonTree implements OnInit {



  @Input()
  holdStatus = false;

  @Input()
  selectStrategy = SelectStrategy.Single;

  @Input('showStation')
  showStation = false; // 区划树或厢房树

  @Input() showSearchBar = true;

  @Input() showButtonIcon = false;



  // 默认选中列表
  private _defaultIds: string[] = []
  @Input()
  set defaultIds(ids: string[]) {
    // 排除空字符串
    this._defaultIds = ids.filter(id => id);
  }
  get defaultIds() {
    return this._defaultIds;
  }

  // 强制最大深度节点为叶节点，虽然实际有子节点
  @Input()
  depthIsEnd = false;

  // 请求数据的深度
  private _depth: number = 0;
  @Input()
  set depth(val: number) {
    if (val < 0) {
      val = 0
    }
    this._depth = val;
  }
  get depth() {
    return this._depth
  }

  // 展示数据的深度，一般等于 depth
  private _showDepth: number = -1;
  @Input()
  set showDepth(val: number) {
    if (val < 0) {
      val = 0
    }
    this._showDepth = val;
  }
  get showDepth() {
    return this._showDepth
  }


  @Output() defaultIdsChange = new EventEmitter<string[]>();
  @Output() selectTreeNode: EventEmitter<CommonFlatNode<any>[]> = new EventEmitter<CommonFlatNode<any>[]>();

  @Output() holdStatusChange = new EventEmitter();
  @Output() buttonIconClickEvent = new EventEmitter<CommonFlatNode>();



  @ViewChild(CommonTreeComponent) override tree?: CommonTreeComponent;

  constructor(private _business: DivisionTreeBusiness, private _toastrService: ToastrService) {
    super();
  }

  ngOnInit(): void {
    // 如果showDepth没有设置或者比depth大，则用depth的值
    if (this.showDepth == -1 || this.showDepth > this.depth)
      this.showDepth = this.depth;

    this._business.showStation = this.showStation;
    this._business.depthIsEnd = this.depthIsEnd;
    this._init()
  }
  private async _init() {
    this._nestedNodeMap = this._business.nestedNodeMap;


    // let res = await this._business.init(this.resourceType, this.depth);
    // this.dataSubject.next(res);
    // if (this.tree) {
    //   this.tree.expandNodeRecursively(res, this.showDepth)
    //   this.tree.setDefaultNodes();
    // }
  }

  async loadChildrenEvent(flat: CommonFlatNode<any>) {

  }
  override selectTreeNodeHandler(change: SelectionChange<CommonFlatNode<any>>) {

  }
  defaultIdsChangeHandler(ids: string[]) {
    this.defaultIdsChange.emit(ids)
  }
  async searchEventHandler(condition: string) {

  }


}
