import { WindowViewModel } from 'src/app/components/window-control/window.model';
import { VehicleRecord } from 'src/app/models/vehicle-record.model';
import { IndexWindowBusiness } from './index-window.business';

export class IndexDeployVehicleDetailsWindow extends WindowViewModel {
  constructor(private window: IndexWindowBusiness) {
    super();
  }

  record?: VehicleRecord;

  title: string = '';
  style = {
    width: 'auto',
    height: 'auto',
  };

  onclose(update: boolean) {
    this.show = false;
    if (update) {
      this.window.deploy.load.emit();
    }
  }
}
