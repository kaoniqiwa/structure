import { SelectionChange } from '@angular/cdk/collections';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { RegionTreeSource } from 'src/app/components/region-tree/region-tree.converter';
import { RegionNodeType } from 'src/app/enums/region-node-type.enum';
import { Deduplication } from 'src/app/tools/deduplication';
import { CommonFlatNode } from '../common-tree/common-flat-node.model';
import { CommonTree } from '../common-tree/common-tree';
import { CommonTreeComponent } from '../common-tree/common-tree.component';
import { RegionTreeBusiness } from './region-tree.business';

@Component({
  selector: 'howell-region-tree',
  templateUrl: './region-tree.component.html',
  styleUrls: ['./region-tree.component.less'],
  providers: [RegionTreeBusiness],
})
export class RegionTreeComponent
  extends CommonTree
  implements OnInit, OnChanges
{
  private _condition: string = '';
  private _searchGuards: string[] = ['街道', '路居委会'];

  private _excludeGuards: string[] = [];

  @Input()
  showRegionNode = false;

  @Input() showButtonIcon = false;

  @Input() holdStatus = true;

  @Input() showSearchBar = true;
  @Input() setting = false;
  @Input() nodeType?: RegionNodeType;
  @Input() load?: EventEmitter<void>;

  // 默认选中列表
  private _defaultIds: string[] = [];
  @Input()
  set defaultIds(ids: string[]) {
    // 排除空字符串
    this._defaultIds = ids.filter((id) => id);
  }
  get defaultIds() {
    return this._defaultIds;
  }

  @Output() selectTreeNode: EventEmitter<CommonFlatNode[]> = new EventEmitter<
    CommonFlatNode[]
  >();

  @Output() buttonIconClickEvent = new EventEmitter<CommonFlatNode>();

  @ViewChild(CommonTreeComponent) override tree?: CommonTreeComponent;

  constructor(
    private _business: RegionTreeBusiness,
    private _toastrService: ToastrService
  ) {
    super();
    this._excludeGuards = Deduplication.generateExcludeArray(
      this._searchGuards
    );
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['load']) {
      if (this.load) {
        this.load.subscribe((x) => {
          this._init();
        });
      }
    }
  }

  ngOnInit(): void {
    this._init();
  }

  private async _init() {
    this._nestedNodeMap = this._business.nestedNodeMap;
    this._business.showRegionNode = this.showRegionNode;

    let res = await this._business.init(
      this._condition,
      this.setting,
      this.nodeType
    );
    this.dataSubject.next(res);

    this.tree?.expandAll();
  }

  async searchEventHandler(condition: string) {
    console.log('搜索字段', condition);
    if (this._condition == condition && this._condition != '') {
      this._toastrService.warning('重复搜索相同字段');
      return;
    }
    if (this._excludeGuards.includes(condition)) {
      this._toastrService.warning('关键字不能是: ' + condition);
      return;
    }

    this._condition = condition;

    let res = await this._business.searchNode(condition, this.setting);
    // console.log(res)
    if (res && res.length) {
      this._toastrService.success('操作成功');
      this.dataSubject.next(res);
      this.tree?.expandAll();
    } else {
      this._toastrService.warning('无匹配结果');
    }
  }
  buttonIconClick(node: CommonFlatNode) {
    this.buttonIconClickEvent.emit(node);
  }

  setDefault() {
    if (this.dataSubject.value.length)
      this.defaultIds = [this.dataSubject.value[0].Id];
  }
}
