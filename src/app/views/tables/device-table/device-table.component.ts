import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { VideoArgsConverter } from 'src/app/converters/args/video-args.converter';
import { OnlineStatus } from 'src/app/enums/online-status.enum';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { IComponent } from 'src/app/interfaces/component.interfact';
import { VideoArgs } from 'src/app/models/args/video.args';
import { IModel } from 'src/app/models/model.interface';
import { RegionNode } from 'src/app/models/region-node.model';
import { DeviceTableBusiness } from './device-table.business';
import { DeviceTabelArgs, DeviceTableModel } from './device-table.model';

@Component({
  selector: 'app-device-table',
  templateUrl: './device-table.component.html',
  styleUrls: ['../table.less', './device-table.component.less'],
  providers: [DeviceTableBusiness],
})
export class DeviceTableComponent
  implements IComponent<IModel[], DeviceTableModel[]>, OnInit, OnChanges
{
  @Input()
  status?: OnlineStatus;
  @Input()
  name?: string;
  @Input()
  load?: EventEmitter<DeviceTabelArgs>;
  @Input()
  business: IBusiness<IModel[], DeviceTableModel[]>;

  @Output()
  video: EventEmitter<VideoArgs> = new EventEmitter();
  @Output()
  position: EventEmitter<RegionNode> = new EventEmitter();

  constructor(business: DeviceTableBusiness) {
    this.business = business;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['load']) {
      if (this.load) {
        this.load.subscribe((x) => {
          this.status = x.status;
          this.name = x.name;
          this.loadData();
        });
      }
    }
  }
  OnlineStatus = OnlineStatus;
  widths = ['50%', '20%', '20%', '10%'];
  datas: DeviceTableModel[] = [];
  ngOnInit(): void {}
  async loadData() {
    this.datas = await this.business.load(this.status, this.name);
  }
  onvideo(e: Event, item: DeviceTableModel) {
    let args = VideoArgsConverter.Convert(item.data);
    this.video.emit(args);
    e.stopPropagation();
  }
  onposition(e: Event, item: RegionNode) {
    this.position.emit(item);
    e.stopPropagation();
  }
}
