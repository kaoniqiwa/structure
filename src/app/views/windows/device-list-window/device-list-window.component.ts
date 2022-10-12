import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { WindowComponent } from 'src/app/components/window-control/window.component';
import { VideoArgs } from 'src/app/models/args/video.args';
import { RegionNode } from 'src/app/models/region-node.model';
import { DeviceTabelArgs } from '../../tables/device-table/device-table.model';

@Component({
  selector: 'app-device-list-window',
  templateUrl: './device-list-window.component.html',
  styleUrls: ['./device-list-window.component.less'],
})
export class DeviceListWindowComponent
  extends WindowComponent
  implements OnInit, AfterViewInit
{
  @Output()
  video: EventEmitter<VideoArgs> = new EventEmitter();
  @Output()
  position: EventEmitter<RegionNode> = new EventEmitter();
  constructor() {
    super();
  }
  ngAfterViewInit(): void {
    this.onload();
  }
  load: EventEmitter<DeviceTabelArgs> = new EventEmitter();
  name?: string;

  override ngOnInit(): void {}
  onvideo(args: VideoArgs) {
    this.video.emit(args);
  }
  onposition(args: RegionNode) {
    this.position.emit(args);
  }
  onsearch(text: string) {
    if (text) this.name = text;
    else {
      this.name = undefined;
    }
    this.onload();
  }
  onload() {
    let args = new DeviceTabelArgs();
    args.name = this.name;
    args.status = this.status;
    this.load.emit(args);
  }
}
