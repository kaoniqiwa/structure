import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SelectStrategy } from 'src/app/enums/select-strategy.enum';
import { CommonFlatNode } from '../common-tree/common-flat-node.model';
import { CommonNestNode } from '../common-tree/common-nest-node.model';
import { CommonTree } from '../common-tree/common-tree';
import { CommonTreeComponent } from '../common-tree/common-tree.component';
import { ResourceTreeBusiness } from './resource-tree.business';

@Component({
  selector: 'resource-tree',
  templateUrl: './resource-tree.component.html',
  styleUrls: ['./resource-tree.component.less'],
  providers: [ResourceTreeBusiness],
})
export class ResourceTreeComponent extends CommonTree implements OnInit {
  showSearchBar = true;

  @Input('selectStrategy') selectStrategy = SelectStrategy.Multiple; // 单选或多选

  @Output() selectTreeNode: EventEmitter<CommonFlatNode[]> = new EventEmitter<
    CommonFlatNode[]
  >();

  private _condition: string = '';
  @ViewChild(CommonTreeComponent) override tree?: CommonTreeComponent;

  constructor(
    private _business: ResourceTreeBusiness,
    private _toastrService: ToastrService
  ) {
    super();
  }

  ngOnInit(): void {
    this._init();
  }

  private async _init() {
    this._nestedNodeMap = this._business.nestedNodeMap;

    let res = await this._business.init(this._condition);
    // console.log(res);
    this.dataSubject.next(res);

    // this.tree?.expandAll();
  }
  async searchEventHandler(condition: string) {
    console.log('搜索字段', condition);
    if (this._condition == condition && this._condition != '') {
      this._toastrService.warning('重复搜索相同字段');
      return;
    }

    this._condition = condition;

    let res = await this._business.searchNode(condition);
    // console.log(res)
    if (res && res.length) {
      this._toastrService.success('操作成功');
      this.dataSubject.next(res);
      this.tree?.expandAll();
    } else {
      this._toastrService.warning('无匹配结果');
    }
  }
}
