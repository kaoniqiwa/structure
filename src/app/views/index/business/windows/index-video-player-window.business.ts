import { PlayMode } from 'src/app/components/video-player/video.model';
import { WindowViewModel } from 'src/app/components/window-control/window.model';

export class IndexVideoPlayerWindow extends WindowViewModel {
  constructor() {
    super();
  }

  cameraId?: string;
  mode: PlayMode = PlayMode.live;

  title: string = '';

  autoplay: boolean = false;
  time?: Date;
  style = {
    width: '80%',
    height: 'calc(80% + 40px)',
  };
}
