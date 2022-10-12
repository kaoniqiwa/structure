import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WindowComponent } from 'src/app/components/window-control/window.component';
import { VideoArgs } from 'src/app/models/args/video.args';
import { RegionNode } from 'src/app/models/region-node.model';

@Component({
  selector: 'app-device-list-window',
  templateUrl: './device-list-window.component.html',
  styleUrls: ['./device-list-window.component.less'],
})
export class DeviceListWindowComponent
  extends WindowComponent
  implements OnInit
{
  @Output()
  video: EventEmitter<VideoArgs> = new EventEmitter();
  @Output()
  position: EventEmitter<RegionNode> = new EventEmitter();
  constructor() {
    super();
  }

  override ngOnInit(): void {}
  onvideo(args: VideoArgs) {
    this.video.emit(args);
  }
  onposition(args: RegionNode) {
    this.position.emit(args);
  }
}
