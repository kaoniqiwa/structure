import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { CommonTableComponent } from 'src/app/components/common-table/common.component';
import { TableColumnModel } from 'src/app/components/common-table/table.model';
import { FormState } from 'src/app/enums/form-state.enum';
import { RegionNodeType } from 'src/app/enums/region-node-type.enum';
import { SelectStrategy } from 'src/app/enums/select-strategy.enum';
import { TableSelectStateEnum } from 'src/app/enums/table-select-state.enum';
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

  @ViewChild('addTable') addTable?: CommonTableComponent;
  @ViewChild('editTable') editTable?: CommonTableComponent;

  FormState = FormState;
  RegionNodeType = RegionNodeType;

  regionNodeName = '';
  regionNodeType = RegionNodeType.face;

  allCameras: Camera[] = [];
  region: Region | null = null;
  regionNode: RegionNode | null = null;

  selectStrategy = SelectStrategy.Single;
  columnModel: TableColumnModel[] = [...CameraConf]; // 表格列配置详情
  displayedColumns: string[] = this.columnModel.map((model) => model.columnDef);

  addSelectedRows: Camera[] = [];
  addDataSubject = new BehaviorSubject<Camera[]>([]);

  editSelectedRows: Camera[] = [];
  editDataSubject = new BehaviorSubject<Camera[]>([]);

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
      this.addDataSubject.next(this.allCameras);
    } else if (this.state == FormState.edit) {
      console.log(this.regionNodeId);
      let res = await this._business.getRegionNode(
        this.regionId,
        this.regionNodeId
      );
      console.log(res);

      this.regionNode = res;
      this.regionNodeName = res.Name;
      this.regionNodeType = res.NodeType ?? RegionNodeType.face;

      let camera = await this._business.getCamera(res.ResourceId);
      this.editDataSubject.next([camera]);
    }
  }

  selectAddTableRow(rows: Camera[]) {
    this.addSelectedRows = rows;
  }

  selectEditTableRow(rows: Camera[]) {
    this.editSelectedRows = rows;
  }
  async onSubmit() {
    if (this.state == FormState.add) {
      if (this.addSelectedRows.length == 0) {
        this._toastrService.warning('请绑定摄像机');
        return;
      }
      let camera = this.addSelectedRows[0];

      let regionNode = new RegionNode();
      regionNode.Id = '';
      regionNode.Name = this.regionNodeName;
      regionNode.NodeType = this.regionNodeType;
      regionNode.RegionId = this.regionId;
      regionNode.ResourceId = camera.Id;
      regionNode.ResourceType = camera.ResourceType;

      let res = await this._business.addRegionNode(regionNode);

      if (res) {
        this._toastrService.success('操作成功');
        this.closeEvent.emit(true);
      }
    } else if (this.state == FormState.edit) {
      if (this.regionNode) {
        this.regionNode.Name = this.regionNodeName;
        this.regionNode.NodeType = this.regionNodeType;

        let res = await this._business.updateRegionNode(this.regionNode);
        console.log(res);
        if (res) {
          this._toastrService.success('操作成功');
          this.closeEvent.emit(true);
        }
      }
    }
  }
  onReset() {
    this.closeEvent.emit(false);
  }
}
