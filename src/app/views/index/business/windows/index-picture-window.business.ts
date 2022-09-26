import { WindowViewModel } from 'src/app/components/window-control/window.model';
import { ImageResult } from 'src/app/models/image-result.model';

export class IndexPictureWindow extends WindowViewModel {
  constructor() {
    super();
  }

  image?: ImageResult;

  title: string = '';
  style = {
    width: '60%',
    height: '60%',
  };
}
