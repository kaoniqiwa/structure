import { FaceDeployControlTask } from 'src/app/models/face-deploy-control-task.model';
import { Page } from 'src/app/models/page-list.model';

export class DeployFaceTableModel<T = any> extends FaceDeployControlTask {
  data?: T;
}
export class DeployFaceTableArgs {
  page?: Page;
}
