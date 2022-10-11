import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PlayMode } from 'src/app/components/video-player/video.model';
import { WindowViewModel } from 'src/app/components/window-control/window.model';
import { VideoArgsConverter } from 'src/app/converters/args/video-args.converter';
import { PictureArgs } from 'src/app/models/args/picture.args';
import { VideoArgs } from 'src/app/models/args/video.args';
import { EventRecord } from 'src/app/models/event-record/event.record';
import { FaceRecord } from 'src/app/models/face-record.model';
import { Page } from 'src/app/models/page-list.model';
import { StructuredDataAbstractComponent } from '../structured-data-abstract.component';
import { StructuredDataFaceQueryModel } from '../structured-data-face-query/structured-data-face-query.model';
import { StructuredDataItemModel } from '../structured-data-item/structured-data-item.model';
import { StructuredDataFaceAttributeBusiness } from './structured-data-face-attribute.business';
import { StructuredDataFaceImageBusiness } from './structured-data-face-image.business';
import { StructuredDataFaceBusiness } from './structured-data-face.business';

@Component({
  selector: 'app-structured-data-face',
  templateUrl: './structured-data-face.component.html',
  styleUrls: ['./structured-data-face.component.less'],
  providers: [
    StructuredDataFaceImageBusiness,
    StructuredDataFaceAttributeBusiness,
    StructuredDataFaceBusiness,
  ],
})
export class StructuredDataFaceComponent
  extends StructuredDataAbstractComponent<StructuredDataItemModel>
  implements OnInit
{
  @Output()
  playback: EventEmitter<VideoArgs> = new EventEmitter();
  @Output()
  picture: EventEmitter<EventRecord> = new EventEmitter();

  constructor(private business: StructuredDataFaceBusiness) {
    super();
  }
  query?: StructuredDataFaceQueryModel;
  style = {
    width: 'auto',
    height: 'auto',
  };
  ngOnInit(): void {}

  onquery(query: StructuredDataFaceQueryModel) {
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
  async onmagnify(src: string) {
    let args = new PictureArgs();
    args.url = await src;
    this.image.emit(args);
  }
  onplayback(item: any) {
    let record = item as FaceRecord;
    let args = new VideoArgs();
    args.autoplay = true;
    args.cameraId = record.CameraId ?? '';
    args.data = record;
    args.mode = PlayMode.vod;
    args.time = record.CaptureTime;
    args.title = record.CameraName ?? '';
    this.playback.emit(args);
  }
}
