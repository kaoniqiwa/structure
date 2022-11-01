import { WindowViewModel } from 'src/app/components/window-control/window.model';
import { PictureArgs } from 'src/app/models/args/picture.args';
import { EventRecord } from 'src/app/models/event-record/event.record';
import { IModel } from 'src/app/models/model.interface';
import { Medium } from 'src/app/tools/medium';
import { IndexWindowBusiness } from './index-window.business';

export class IndexDetailsWindow extends WindowViewModel {
  constructor(private window: IndexWindowBusiness) {
    super();
  }

  record?: IModel;

  title: string = '';
  style = {
    width: 'auto',
    height: 'auto',
  };
  async onpicture(url: string) {
    this.window.picture.image = await Medium.image(await url);

    this.window.picture.show = true;
  }
  onclose(open: boolean) {
    this.show = open;
  }
}
