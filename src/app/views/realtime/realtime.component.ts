import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RegionNode } from 'src/app/models/region-node.model';
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

  constructor(private _business: RealTimeBusiness) {}

  ngOnInit(): void {}

  onvideo(camera: Camera) {
    this.video.emit(camera);
  }
  onAlarmLoaded(data: AlarmModel[]) {
    console.log(data);
  }
}
