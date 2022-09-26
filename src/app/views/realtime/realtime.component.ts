import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PictureArgs } from 'src/app/models/args/picture.args';
import { VideoArgs } from 'src/app/models/args/video.args';
import { Camera } from 'src/app/models/resource/camera.resource';
import { AlarmModel } from '../alarm/alarm.model';
import { RealTimeBusiness } from './realtime.business';

@Component({
  selector: 'app-realtime',
  templateUrl: './realtime.component.html',
  styleUrls: ['./realtime.component.less'],
  providers: [RealTimeBusiness],
})
export class RealtimeComponent implements OnInit {
  @Output()
  video: EventEmitter<Camera> = new EventEmitter();

  @Output()
  picture: EventEmitter<PictureArgs> = new EventEmitter();
  @Output()
  playback: EventEmitter<VideoArgs> = new EventEmitter();

  constructor(private _business: RealTimeBusiness) {}

  ngOnInit(): void {}

  onvideo(camera: Camera) {
    this.video.emit(camera);
  }
  onAlarmLoaded(data: AlarmModel[]) {
    console.log(data);
  }
  onpicture(args: PictureArgs) {
    this.picture.emit(args);
  }
  onplayback(args: VideoArgs) {
    this.playback.emit(args);
  }
}
