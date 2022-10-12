import { EventEmitter } from '@angular/core';
import { WindowViewModel } from 'src/app/components/window-control/window.model';
import { OnlineStatus } from 'src/app/enums/online-status.enum';
import { VideoArgs } from 'src/app/models/args/video.args';
import { RegionNode } from 'src/app/models/region-node.model';
import { Camera } from 'src/app/models/resource/camera.resource';
import { IndexWindowBusiness } from './index-window.business';

export class IndexDeviceWindow extends WindowViewModel {
  constructor(private window: IndexWindowBusiness) {
    super();
  }

  status?: OnlineStatus;

  position: EventEmitter<RegionNode> = new EventEmitter();

  title: string = '';
  style = {
    width: '80%',
    height: '80%',
  };

  onclose(open: boolean) {
    this.show = open;
  }
  onvideo(args: VideoArgs) {
    this.window.video.autoplay = args.autoplay;
    this.window.video.cameraId = args.cameraId;
    this.window.video.title = args.title;
    this.window.video.show = true;
  }
  onposition(node: RegionNode) {
    this.position.emit(node);
    this.show = false;
  }
}
