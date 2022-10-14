import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PlayMode } from 'src/app/components/video-player/video.model';
import { WindowViewModel } from 'src/app/components/window-control/window.model';
import { PictureArgs } from 'src/app/models/args/picture.args';
import { VideoArgs } from 'src/app/models/args/video.args';
import { EventRecord } from 'src/app/models/event-record/event.record';
import { Page } from 'src/app/models/page-list.model';
import { VehicleRecord } from 'src/app/models/vehicle-record.model';
import { StructuredDataAbstractComponent } from '../structured-data-abstract.component';
import { StructuredDataItemModel } from '../structured-data-item/structured-data-item.model';
import { StructuredDataVehicleQueryModel } from '../structured-data-vehicle-query/structured-data-vehicle-query.model';
import { StructuredDataVehicleBusiness } from './structured-data-vehicle.business';

@Component({
  selector: 'app-structured-data-vehicle',
  templateUrl: './structured-data-vehicle.component.html',
  styleUrls: ['./structured-data-vehicle.component.less'],
  providers: [StructuredDataVehicleBusiness],
})
export class StructuredDataVehicleComponent
  extends StructuredDataAbstractComponent<StructuredDataItemModel>
  implements OnInit
{
  @Output()
  playback: EventEmitter<VideoArgs> = new EventEmitter();
  @Output()
  deploy: EventEmitter<VehicleRecord> = new EventEmitter();
  constructor(private business: StructuredDataVehicleBusiness) {
    super();
  }
  query?: StructuredDataVehicleQueryModel;
  style = {
    width: 'auto',
    height: 'auto',
  };
  ngOnInit(): void {}

  onquery(query: StructuredDataVehicleQueryModel) {
    console.log(query);
    this.query = query;
    this.loadData(1);
  }

  async loadData(index: number) {
    if (this.query) {
      let paged = await this.business.load(this.query, index);
      this.page = paged.Page;
      console.log(paged.Data);
      this.datas = paged.Data;
    }
  }
  onplayback(item: any) {
    let record = item as VehicleRecord;
    let args = new VideoArgs();
    args.autoplay = true;
    args.cameraId = record.CameraId ?? '';
    args.data = record;
    args.mode = PlayMode.vod;
    args.time = record.CaptureTime;
    args.title = record.CameraName ?? '';
    this.playback.emit(args);
  }
  async onmagnify(src: string) {
    let args = new PictureArgs();
    args.url = await src;
    this.image.emit(args);
  }
  ondeploy(item: any) {
    if (this.selected) {
      this.deploy.emit(this.selected.data);
    }
  }
}
