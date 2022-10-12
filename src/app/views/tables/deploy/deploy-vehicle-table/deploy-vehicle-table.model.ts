import { Duration } from 'src/app/models/duration.model';
import { Page } from 'src/app/models/page-list.model';
import { VehicleDeployControlTask } from 'src/app/models/vehicle-deploy-control-task.model';

export class DeployVehicleTableModel<T = any> extends VehicleDeployControlTask {
  data?: T;
  ReasonName?: string;
}
export class DeployVehicleTableArgs {
  page?: Page;
}
