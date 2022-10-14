import { WindowViewModel } from 'src/app/components/window-control/window.model';
import { FaceRecord } from 'src/app/models/face-record.model';
import { IndexWindowBusiness } from './index-window.business';

export class IndexDeployFaceDetailsWindow extends WindowViewModel {
  constructor(private window: IndexWindowBusiness) {
    super();
  }

  record?: FaceRecord;

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
