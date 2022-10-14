import { TableColumnModel } from 'src/app/components/common-table/table.model';
import { Camera } from 'src/app/models/resource/camera.resource';
import { Language } from 'src/app/tools/language';
import { RegionNodeResource } from './region-node-operate.model';

export const AddCameraConf: TableColumnModel[] = [
  {
    columnDef: 'CameraName',
    header: '名称',
    cell: (element: RegionNodeResource) => `${element.Name}`,
    flexBasis: '12%',
  },
];

export const EditCameraConf: TableColumnModel[] = [
  {
    columnDef: 'CameraName',
    header: '名称',
    cell: (element: Camera) => `${element.Name}`,
    flexBasis: '12%',
  },
  {
    columnDef: 'CameraType',
    header: '类型',
    cell: (element: Camera) => `${Language.CameraType(element.CameraType)}`,
  },
  {
    columnDef: 'OnlineStatus',
    header: '在线状态',
    cell: (element: Camera) =>
      `${
        element.OnlineStatus == undefined
          ? ''
          : Language.OnlineStatus(element.OnlineStatus)
      }`,
  },
];
