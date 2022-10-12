import { OnlineStatus } from 'src/app/enums/online-status.enum';
import { RegionNode } from 'src/app/models/region-node.model';

export class DeviceTableModel<T = any> {
  data?: T;
  id: string = '';
  img!: Promise<string>;
  name: string = '';
  status: OnlineStatus = OnlineStatus.offline;
  node?: RegionNode;
}
