import { OnlineStatus } from 'src/app/enums/online-status.enum';
import { ResourceType } from 'src/app/enums/resource-type.enum';
import { RegionNode } from 'src/app/models/region-node.model';

export class DeviceTableModel<T = any> {
  data?: T;
  id: string = '';
  img!: Promise<string>;
  name: string = '';
  status: OnlineStatus = OnlineStatus.offline;
  node?: RegionNode;
  type: ResourceType = ResourceType.Camera;
}
export class DeviceTabelArgs {
  status?: OnlineStatus;
  name?: string;
}
