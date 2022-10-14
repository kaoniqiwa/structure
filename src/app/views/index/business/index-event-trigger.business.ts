import { Injectable } from '@angular/core';
import { PlayMode } from 'src/app/components/video-player/video.model';
import { VideoControlConverter } from 'src/app/converters/video-control.converter';
import { DeployType } from 'src/app/enums/deploy-type.enum';
import { OnlineStatus } from 'src/app/enums/online-status.enum';
import { PictureArgs } from 'src/app/models/args/picture.args';
import { VideoArgs } from 'src/app/models/args/video.args';
import { EventRecord } from 'src/app/models/event-record/event.record';
import { FaceRecord } from 'src/app/models/face-record.model';
import { Camera } from 'src/app/models/resource/camera.resource';
import { VehicleRecord } from 'src/app/models/vehicle-record.model';
import { Medium } from 'src/app/tools/medium';
import { IndexWindowBusiness } from './windows/index-window.business';
import { VideoControlWindowBusiness } from './windows/video-control-window.business';

@Injectable()
export class IndexEventTriggerBusiness {
  constructor(window: IndexWindowBusiness, video: VideoControlWindowBusiness) {
    this.realtime = new RealTimeTrigger(window, video);
    this.structured = new StructuredDataTrigger(window);
    this.record = new EventRecordTrigger(window);
    this.deploy = new DeployListTrigger(window);
  }
  realtime: RealTimeTrigger;
  structured: StructuredDataTrigger;
  record: EventRecordTrigger;
  deploy: DeployListTrigger;
}

class RealTimeTrigger {
  constructor(
    private window: IndexWindowBusiness,
    private video: VideoControlWindowBusiness
  ) {}

  converter = new VideoControlConverter();
  ondevice(status?: OnlineStatus) {
    this.window.device.status = status;
    this.window.device.show = true;
  }
  onvideo(camera: Camera) {
    console.log(camera);
    this.video.load(camera);
    this.video.show = true;
  }
  ondetails(args: EventRecord) {
    this.window.details.record = args;
    this.window.details.show = true;
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
    this.window.picture.image = await Medium.image(model.id);

    this.window.picture.show = true;
  }
}
class StructuredDataTrigger {
  constructor(private window: IndexWindowBusiness) {}
  onimage(args: PictureArgs) {
    this.window.picture.title = args.title;
    this.window.picture.image = {
      url: args.url ?? '',
      error: false,
    };

    this.window.picture.show = true;
  }
  onplayback(args: VideoArgs) {
    this.window.video.mode = PlayMode.vod;
    this.window.video.cameraId = args.cameraId;
    this.window.video.title = args.title;
    this.window.video.autoplay = args.autoplay;
    this.window.video.time = args.time;
    this.window.video.show = true;
  }

  ondeploy(record: FaceRecord | VehicleRecord) {
    if (record instanceof FaceRecord) {
      this.window.deploy.face.record = record;
      this.window.deploy.face.show = true;
    } else if (record instanceof VehicleRecord) {
      this.window.deploy.vehicle.record = record;
      this.window.deploy.vehicle.show = true;
    } else {
    }
  }
}
class EventRecordTrigger {
  constructor(private window: IndexWindowBusiness) {}
  ondetails(args: EventRecord) {
    this.window.details.record = args;
    this.window.details.show = true;
  }
  onplayback(args: VideoArgs) {
    this.window.video.mode = PlayMode.vod;
    this.window.video.cameraId = args.cameraId;
    this.window.video.title = args.title;
    this.window.video.autoplay = args.autoplay;
    this.window.video.time = args.time;
    this.window.video.show = true;
  }
}
class DeployListTrigger {
  constructor(private window: IndexWindowBusiness) {}
  async onpicture(model: PictureArgs) {
    this.window.picture.title = model.title;
    this.window.picture.image = await Medium.image(model.id);

    this.window.picture.show = true;
  }
  ondetails(args: any) {
    this.window.details.record = args;
    this.window.details.show = true;
  }
  onplayback(args: VideoArgs) {
    this.window.video.mode = PlayMode.vod;
    this.window.video.cameraId = args.cameraId;
    this.window.video.title = args.title;
    this.window.video.autoplay = args.autoplay;
    this.window.video.time = args.time;
    this.window.video.show = true;
  }
  ondeploy(type: DeployType) {
    switch (type) {
      case DeployType.face:
        this.window.deploy.face.record = undefined;
        this.window.deploy.face.show = true;
        break;
      case DeployType.vehicle:
        this.window.deploy.vehicle.record = undefined;
        this.window.deploy.vehicle.show = true;
        break;
      default:
        break;
    }
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
