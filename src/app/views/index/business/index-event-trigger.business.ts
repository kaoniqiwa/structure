import { Injectable } from '@angular/core';
import { PlayMode } from 'src/app/components/video-player/video.model';
import { VideoControlConverter } from 'src/app/converters/video-control.converter';
import { PictureArgs } from 'src/app/models/args/picture.args';
import { VideoArgs } from 'src/app/models/args/video.args';
import { Camera } from 'src/app/models/resource/camera.resource';
import { Medium } from 'src/app/tools/medium';
import { IndexWindowBusiness } from './windows/index-window.business';
import { VideoControlWindowBusiness } from './windows/video-control-window.business';

@Injectable()
export class IndexEventTriggerBusiness {
  constructor(window: IndexWindowBusiness, video: VideoControlWindowBusiness) {
    this.realtime = new RealTimeTrigger(window, video);
  }
  realtime: RealTimeTrigger;
}

class RealTimeTrigger {
  constructor(
    private window: IndexWindowBusiness,
    private video: VideoControlWindowBusiness
  ) {}

  converter = new VideoControlConverter();
  onvideo(camera: Camera) {
    console.log(camera);
    this.video.load(camera);
    this.video.show = true;
  }
  onpreview(args: VideoArgs) {
    this.window.video.mode = PlayMode.live;
    this.window.video.cameraId = args.cameraId;
    this.window.video.title = args.title;
    this.window.video.autoplay = true;
    this.window.video.show = true;
  }
  onplayback(args: VideoArgs) {
    this.window.video.mode = PlayMode.vod;
    this.window.video.cameraId = args.cameraId;
    this.window.video.title = args.title;
    this.window.video.autoplay = args.autoplay;
    this.window.video.time = args.time;
    this.window.video.show = true;
  }
  async onpicture(model: PictureArgs) {
    this.window.picture.title = model.title;
    let result = await Medium.image(model.id);
    this.window.picture.url = result.url;
    this.window.picture.isError = result.error;

    this.window.picture.show = true;
  }
}
// class RecordTrigger {
//   constructor(private window: IndexWindowBusiness) {}

//   async picture(model: PictureArgs) {
//     this.window.picture.title = model.title;
//     let result = await Medium.image(model.id);
//     this.window.picture.url = result.url;
//     this.window.picture.isError = result.error;
//     this.window.picture.show = true;
//   }
//   playback(model: VideoArgs) {
//     this.window.video.cameraId = model.cameraId;
//     this.window.video.title = model.title;
//     this.window.video.autoplay = model.autoplay;
//     this.window.video.time = model.time;
//     this.window.video.mode = model.mode;
//     this.window.video.show = true;
//   }
// }
