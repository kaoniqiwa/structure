import { TableColumnModel } from 'src/app/components/common-table/table.model';
import { Camera } from 'src/app/models/resource/camera.resource';

export const CameraConf: TableColumnModel[] = [
  {
    columnDef: 'CameraName',
    header: '名称',
    cell: (element: Camera) => `${element.Name}`,
    flexBasis: '12%',
  },
  {
    columnDef: 'CameraType',
    header: '类型',
    cell: (element: Camera) => `${element.CameraType}`,
  },
];
