import { Injectable } from '@angular/core';
import { IndexPictureWindow } from './index-picture-window.business';
import { IndexVideoPlayerWindow } from './index-video-player-window.business';

@Injectable()
export class IndexWindowBusiness {
  video: IndexVideoPlayerWindow = new IndexVideoPlayerWindow();
  picture: IndexPictureWindow = new IndexPictureWindow();
}
