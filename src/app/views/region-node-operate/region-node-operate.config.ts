import { TableColumnModel } from 'src/app/components/common-table/table.model';
import { RegionNodeResource } from './region-node-operate.model';

export const REGION_NODE_TABLE: TableColumnModel[] = [
  {
    columnDef: 'CameraName',
    header: '名称',
    cell: (element: RegionNodeResource) => `${element.Name}`,
    flexBasis: '35%',
  },

  {
    columnDef: 'DetailTypeName',
    header: '类型',
    cell: (element: RegionNodeResource) => `${element.DetailTypeName}`,
    flexBasis: '30%',
  },
  {
    columnDef: 'OnlineStatus',
    header: '在线状态',
    cell: (element: RegionNodeResource) => `${element.OnlineStatus}`,
    flexBasis: '10%',
  },
  {
    columnDef: 'IsBind',
    header: '',
    cell: (element: RegionNodeResource) => `${element.IsBind}`,
    flexBasis: '1%',
  },
];
