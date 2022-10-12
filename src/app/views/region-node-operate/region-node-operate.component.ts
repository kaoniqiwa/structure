import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { TableColumnModel } from 'src/app/components/common-table/table.model';
import { FormState } from 'src/app/enums/form-state.enum';
import { RegionNodeType } from 'src/app/enums/region-node-type.enum';
import { SelectStrategy } from 'src/app/enums/select-strategy.enum';
import { RegionNode } from 'src/app/models/region-node.model';
import { Region } from 'src/app/models/region.model';
import { Camera } from 'src/app/models/resource/camera.resource';
import { RegionNodeOperateBusiness } from './region-node-operate.business';
import { CameraConf } from './region-node-operate.config';

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

  FormState = FormState;
  RegionNodeType = RegionNodeType;

  regionNodeName = '';
  regionNodeType = RegionNodeType.face;

  allCameras: Camera[] = [];
  region: Region | null = null;
  regionNodes: RegionNode[] = [];

  aiopDataSubject = new BehaviorSubject<Camera[]>([]);
  selectStrategy = SelectStrategy.Multiple;
  aiopColumnModel: TableColumnModel[] = [...CameraConf]; // 表格列配置详情
  aiopDisplayedColumns: string[] = this.aiopColumnModel.map(
    (model) => model.columnDef
  );
  aiopSelectedRows: Camera[] = [];

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
    let { Data: allCameras } = await this._business.listAllCameras();
    this.allCameras = allCameras;

    console.log('所有摄像机', this.allCameras);
    if (this.state == FormState.add) {
      this.aiopDataSubject.next(this.allCameras);
    } else if (this.state == FormState.edit) {
    }
  }
  onConfirm() {}
  onCancel() {}
}
