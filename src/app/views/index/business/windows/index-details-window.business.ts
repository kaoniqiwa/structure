import { WindowViewModel } from 'src/app/components/window-control/window.model';
import { EventRecord } from 'src/app/models/event-record/event.record';

export class IndexDetailsWindow extends WindowViewModel {
  constructor() {
    super();
  }

  record?: EventRecord;

  title: string = '';
  style = {
    width: 'auto',
    height: 'auto',
  };

  onclose(open: boolean) {
    this.show = open;
  }
}
