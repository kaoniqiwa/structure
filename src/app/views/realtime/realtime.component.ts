import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonFlatNode } from 'src/app/components/common-tree/common-flat-node.model';
import { OnlineStatus } from 'src/app/enums/online-status.enum';
import { PictureArgs } from 'src/app/models/args/picture.args';
import { VideoArgs } from 'src/app/models/args/video.args';
import { EventRecord } from 'src/app/models/event-record/event.record';
import { RegionNode } from 'src/app/models/region-node.model';
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
  @Input()
  position: EventEmitter<RegionNode> = new EventEmitter();

  @Output()
  details: EventEmitter<EventRecord> = new EventEmitter();
  @Output()
  playback: EventEmitter<VideoArgs> = new EventEmitter();
  @Output()
  device: EventEmitter<OnlineStatus> = new EventEmitter();

  constructor(private _business: RealTimeBusiness) {}

  alarmModels: AlarmModel[] = [];
  @ViewChild(DeployInfoComponent) deployFace!: DeployInfoComponent;

  ngOnInit(): void {}

  onvideo(camera: Camera) {
    this.video.emit(camera);
  }
  onAlarmLoaded(data: AlarmModel[]) {
    console.log(data);
  }
  ondetails(args: EventRecord) {
    this.details.emit(args);
  }
  onplayback(args: VideoArgs) {
    this.playback.emit(args);
  }
  alarmLoaded(args: AlarmModel<EventRecord>[]) {
    // console.log('alarmLoaded', args);

    // args = [];
    this.deployFace.subject.next(args[0]?.data);
  }
  onNodeSelected(nodes: CommonFlatNode[]) {
    // if (nodes) {
    //   for (let i = 0; i < nodes.length; i++) {
    //     const node = nodes[i];
    //     if (node.RawData instanceof RegionNode) {
    //       this.position.emit(node.RawData);
    //       return;
    //     }
    //   }
    // }
  }
  onButtonIconClicked(e: CommonFlatNode) {
    console.log(e);
    switch (e.CurrentButtonIcon) {
      case 1:
        this.video.emit(e.RawData.Camera);
        break;
      case 2:
        this.position.emit(e.RawData);
        break;

      default:
        break;
    }
  }
  ondevice(status?: OnlineStatus | undefined) {
    this.device.emit(status);
  }
}
