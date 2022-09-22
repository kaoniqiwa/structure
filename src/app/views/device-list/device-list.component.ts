import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SelectStrategy } from 'src/app/enums/select-strategy.enum';
import { DeviceListModel } from './device-list.model';
import { DeviceListConf } from './device-list.config';
import {
  TableCellEvent,
  TableColumnModel,
  TableOperateModel,
} from 'src/app/components/common-table/table.model';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.less'],
})
export class DeviceListComponent implements OnInit {
  // Table
  dataSubject = new BehaviorSubject<DeviceListModel[]>([]);
  selectStrategy = SelectStrategy.Multiple;
  columnModel: TableColumnModel[] = [...DeviceListConf]; // 表格列配置详情
  displayedColumns: string[] = this.columnModel.map((model) => model.columnDef); // 表格列 id
  tableOperates: TableOperateModel[] = [];
  selectedRows: DeviceListModel[] = []; //table选中项
  willBeDeleted: DeviceListModel[] = [];

  constructor() {}

  ngOnInit(): void {
    let models: DeviceListModel[] = [];

    for (let i = 0; i < 20; i++) {
      let model = new DeviceListModel();
      model.Id = '';
      model.Name = '设备名称';
      model.InstallPos = '东方慧谷222';
      model.CameraType = '普通相机';
      model.Status = '正常';

      models.push(model);
    }

    this.dataSubject.next(models);
  }

  selectTableRow(rows: DeviceListModel[]) {
    this.selectedRows = rows;
    console.log('选择', rows);
  }
  selectTableCell(e: TableCellEvent<DeviceListModel>) {
    console.log(e);
  }
}
