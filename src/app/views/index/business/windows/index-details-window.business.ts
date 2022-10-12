import { WindowViewModel } from 'src/app/components/window-control/window.model';
import { EventRecord } from 'src/app/models/event-record/event.record';
import { IModel } from 'src/app/models/model.interface';

export class IndexDetailsWindow extends WindowViewModel {
  constructor() {
    super();
  }

  record?: IModel;

  title: string = '';
  style = {
    width: 'auto',
    height: 'auto',
  };

  onclose(open: boolean) {
    this.show = open;
  }
}
