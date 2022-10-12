import { IConverter } from 'src/app/interfaces/converter.interface';
import { PagedList } from 'src/app/models/page-list.model';
import { VehicleDeployControlTask } from 'src/app/models/vehicle-deploy-control-task.model';
import { Language } from 'src/app/tools/language';
import { Medium } from 'src/app/tools/medium';
import { DeployVehicleTableModel } from './deploy-vehicle-table.model';

export class DeployVehicleTableConverter
  implements
    IConverter<
      PagedList<VehicleDeployControlTask>,
      PagedList<DeployVehicleTableModel>
    >
{
  item = new DeployVehicleTableItemConverter();
  Convert(
    source: PagedList<VehicleDeployControlTask>,
    ...res: any[]
  ): PagedList<DeployVehicleTableModel<VehicleDeployControlTask>> {
    let paged = new PagedList<
      DeployVehicleTableModel<VehicleDeployControlTask>
    >();
    paged.Page = source.Page;
    paged.Data = source.Data.map((x) => {
      return this.item.Convert(x);
    });
    return paged;
  }
}

class DeployVehicleTableItemConverter
  implements IConverter<VehicleDeployControlTask, DeployVehicleTableModel>
{
  Convert(
    source: VehicleDeployControlTask,
    ...res: any[]
  ): DeployVehicleTableModel<VehicleDeployControlTask> {
    let model = new DeployVehicleTableModel<VehicleDeployControlTask>();
    model.data = source;
    Object.assign(model, source);
    model.ReasonName = Language.VehicleReason(source.Reason);
    return model;
  }
}
