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
import { SuffixIconType } from 'src/app/enums/region-tree.enum';
import { PictureArgs } from 'src/app/models/args/picture.args';
import { VideoArgs } from 'src/app/models/args/video.args';
import { EventRecord } from 'src/app/models/event-record/event.record';
import { RegionNode } from 'src/app/models/region-node.model';
import { Camera } from 'src/app/models/resource/camera.resource';
import { StoreService } from 'src/app/tools/service/store.service';
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

  // 后缀图标类型
  suffixIconType = SuffixIconType.Status;

  constructor(
    private _business: RealTimeBusiness,
    private store: StoreService
  ) {}

  load: EventEmitter<void> = new EventEmitter();
  alarmModels: AlarmModel[] = [];
  @ViewChild(DeployInfoComponent) deployFace!: DeployInfoComponent;

  ngOnInit(): void {
    this.store.interval.subscribe((x) => {
      this.load.emit();
    });
  }

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
  async onButtonIconClicked(e: CommonFlatNode) {
    console.log(e);
    switch (e.CurrentButtonIcon) {
      case 1:
        let camera = await e.RawData.getCamera(e.RawData.ResourceId);
        this.video.emit(camera);
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
