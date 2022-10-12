import { Injectable } from '@angular/core';
import { IndexDetailsWindow } from './index-details-window.business';
import { IndexDeviceWindow } from './index-device-window.business';
import { IndexPictureWindow } from './index-picture-window.business';
import { IndexVideoPlayerWindow } from './index-video-player-window.business';

@Injectable()
export class IndexWindowBusiness {
  video: IndexVideoPlayerWindow = new IndexVideoPlayerWindow();
  picture: IndexPictureWindow = new IndexPictureWindow();
  details: IndexDetailsWindow = new IndexDetailsWindow();
  device: IndexDeviceWindow = new IndexDeviceWindow(this);
}
