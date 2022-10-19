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
import {
  RegionTreeItemType,
  SuffixIconType,
} from 'src/app/enums/region-tree.enum';
import { SelectStrategy } from 'src/app/enums/select-strategy.enum';
import { Deduplication } from 'src/app/tools/deduplication';
import { CommonFlatNode } from '../common-tree/common-flat-node.model';
import { CommonTree } from '../common-tree/common-tree';
import { CommonTreeComponent } from '../common-tree/common-tree.component';
import { RegionTreeBusiness } from './region-tree.business';
import { RegionTreeSearch } from './region-tree.model';

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

  @Input() suffixIconType: SuffixIconType = SuffixIconType.None;

  @Input() disableItemType: RegionTreeItemType = RegionTreeItemType.None;

  @Input() nodeType?: RegionNodeType;

  @Input() showButtonIcon = false;

  @Input() regionNodeClickable = true;

  @Input() holdStatus = true;
  @Input() setting = true;

  @Input() showSearchBar = true;
  @Input() load?: EventEmitter<void>;

  @Input('selectStrategy')
  selectStrategy = SelectStrategy.Single; // 单选或多选

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

  @Output()
  loaded: EventEmitter<any> = new EventEmitter();

  @ViewChild(CommonTreeComponent) override tree?: CommonTreeComponent;

  searchInfo: RegionTreeSearch = {
    Name: '',
  };
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
          console.log('重新请求数据');
          this.reset();
          this._init();
        });
      }
    }
  }

  ngOnInit(): void {
    this.searchInfo.RegionNodeType = this.nodeType;
    this._init();
  }

  private async _init() {
    this._nestedNodeMap = this._business.nestedNodeMap;
    this._business.showRegionNode = this.showRegionNode;
    this._business.suffixIconType = this.suffixIconType;
    this._business.disableItemType = this.disableItemType;

    let res = await this._business.init(this.searchInfo);
    this.dataSubject.next(res);
    this.loaded.emit(this.getRawNodes());

    this.tree?.expandAll();
  }

  async searchEventHandler(condition: string) {
    console.log('搜索字段', condition);
    if (this.searchInfo.Name == condition && this.searchInfo.Name != '') {
      this._toastrService.warning('重复搜索相同字段');
      return;
    }
    if (this._excludeGuards.includes(condition)) {
      this._toastrService.warning('关键字不能是: ' + condition);
      return;
    }

    this.searchInfo.Name = condition;
    this.searchInfo.Name = condition;
    let res = await this._business.searchNode(this.searchInfo);
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
  getRawNodes() {
    return this._business.rawNodes;
  }
}
