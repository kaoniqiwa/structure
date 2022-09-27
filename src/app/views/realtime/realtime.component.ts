import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { PictureArgs } from 'src/app/models/args/picture.args';
import { VideoArgs } from 'src/app/models/args/video.args';
import { Camera } from 'src/app/models/resource/camera.resource';
import { AlarmModel } from '../alarm/alarm.model';
import { DeployInfoComponent } from '../deploy-info/deploy-info.component';
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

  alarmModels: AlarmModel[] = [];
  @ViewChild(DeployInfoComponent) deployFace!: DeployInfoComponent;

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
  alarmLoaded(args: AlarmModel[]) {
    console.log('alarmLoaded', args);

    this.deployFace.subject.next(args.length ? args[0] : null);
  }
}
