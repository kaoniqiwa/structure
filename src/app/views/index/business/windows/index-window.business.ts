import { Injectable } from '@angular/core';
import { IndexDeployWindow } from './index-deploy-window.business';
import { IndexDetailsWindow } from './index-details-window.business';
import { IndexDeviceWindow } from './index-device-window.business';
import { IndexPictureWindow } from './index-picture-window.business';
import { IndexVideoPlayerWindow } from './index-video-player-window.business';

@Injectable()
export class IndexWindowBusiness {
  video: IndexVideoPlayerWindow = new IndexVideoPlayerWindow();
  picture: IndexPictureWindow = new IndexPictureWindow();
  details: IndexDetailsWindow = new IndexDetailsWindow(this);
  device: IndexDeviceWindow = new IndexDeviceWindow(this);
  deploy: IndexDeployWindow = new IndexDeployWindow(this);
}
