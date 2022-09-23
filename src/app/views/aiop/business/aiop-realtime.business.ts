import { Injectable } from '@angular/core';
import { Camera } from 'src/app/models/resource/camera.resource';
import { VideoControlWindowBusiness } from './windows/video-control-window.business';

@Injectable()
export class AIOPRealtimeBusiness {
  constructor(private video: VideoControlWindowBusiness) {}
  onvideo(camera: Camera) {
    console.log(camera);
    this.video.load(camera);
    this.video.show = true;
  }
}
