import { TableColumnModel } from 'src/app/components/common-table/table.model';
import { RegionNodeManageModel } from './region-node-manage.model';

export const GarbageStationManageConf: TableColumnModel[] = [
  {
    columnDef: 'Name',
    header: '名称',
    cell: (element: RegionNodeManageModel) => `${element.Name}`,
  },
  {
    columnDef: 'RegionNodeType',
    header: '节点类型',
    cell: (element: RegionNodeManageModel) => `${element.RegionNodeType}`,
  },
  {
    columnDef: 'UpdateTime',
    header: '更新时间',
    cell: (element: RegionNodeManageModel) => `${element.UpdateTime}`,
  },
];
