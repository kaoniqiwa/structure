import { Duration } from 'src/app/models/duration.model';
import { Page } from 'src/app/models/page-list.model';

export class DeployVehicleTableModel<T = any> {
  data?: T;
}
export class DeployVehicleTableArgs {
  page?: Page;
}
