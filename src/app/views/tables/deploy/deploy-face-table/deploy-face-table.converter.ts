import { IConverter } from 'src/app/interfaces/converter.interface';
import { FaceDeployControlTask } from 'src/app/models/face-deploy-control-task.model';
import { PagedList } from 'src/app/models/page-list.model';
import { Medium } from 'src/app/tools/medium';
import { DeployFaceTableModel } from './deploy-face-table.model';

export class DeployFaceTableConverter
  implements
    IConverter<
      PagedList<FaceDeployControlTask>,
      PagedList<DeployFaceTableModel>
    >
{
  item = new DeployFaceTableItemConverter();
  Convert(
    source: PagedList<FaceDeployControlTask>,
    ...res: any[]
  ): PagedList<DeployFaceTableModel<FaceDeployControlTask>> {
    let paged = new PagedList<DeployFaceTableModel<FaceDeployControlTask>>();
    paged.Page = source.Page;
    paged.Data = source.Data.map((x) => {
      return this.item.Convert(x);
    });
    return paged;
  }
}

class DeployFaceTableItemConverter
  implements IConverter<FaceDeployControlTask, DeployFaceTableModel>
{
  Convert(
    source: FaceDeployControlTask,
    ...res: any[]
  ): DeployFaceTableModel<FaceDeployControlTask> {
    let model = new DeployFaceTableModel<FaceDeployControlTask>();
    model.data = source;
    return model;
  }
}
