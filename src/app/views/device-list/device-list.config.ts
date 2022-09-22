import { TableColumnModel } from 'src/app/components/common-table/table.model';
import { DeviceListModel } from './device-list.model';

export const DeviceListConf: TableColumnModel[] = [
  {
    columnDef: 'Name',
    header: '监控点名称',
    cell: (element: DeviceListModel) => `${element.Name}`,
  },
  {
    columnDef: 'InstallPos',
    header: '安装位置',
    cell: (element: DeviceListModel) => `${element.InstallPos}`,
  },
  {
    columnDef: 'CameraType',
    header: '摄像机类型',
    cell: (element: DeviceListModel) => `${element.CameraType}`,
  },
  {
    columnDef: 'Status',
    header: '状态',
    cell: (element: DeviceListModel) => `${element.Status}`,
  },
];
