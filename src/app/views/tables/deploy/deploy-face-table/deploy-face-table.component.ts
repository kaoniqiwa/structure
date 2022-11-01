import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { PlayMode } from 'src/app/components/video-player/video.model';
import { PictureArgsConverter } from 'src/app/converters/args/picture-args.converter';
import { VideoArgsConverter } from 'src/app/converters/args/video-args.converter';
import {
  IBusiness,
  IRemoveBusiness,
} from 'src/app/interfaces/business.interface';
import { IComponent } from 'src/app/interfaces/component.interfact';
import { PictureArgs } from 'src/app/models/args/picture.args';
import { VideoArgs } from 'src/app/models/args/video.args';
import { FaceDeployControlTask } from 'src/app/models/face-deploy-control-task.model';
import { FaceRecord } from 'src/app/models/face-record.model';
import { IModel } from 'src/app/models/model.interface';
import { PagedList } from 'src/app/models/page-list.model';
import { DeployFaceTableBusiness } from './deploy-face-table.business';
import {
  DeployFaceTableModel,
  DeployFaceTableArgs,
} from './deploy-face-table.model';

@Component({
  selector: 'app-deploy-face-table',
  templateUrl: './deploy-face-table.component.html',
  styleUrls: ['../../table.less', './deploy-face-table.component.less'],
  providers: [DeployFaceTableBusiness],
})
export class DeployFaceTableComponent
  implements
    IComponent<IModel, PagedList<DeployFaceTableModel<FaceDeployControlTask>>>,
    OnInit,
    OnChanges
{
  @Input()
  business: IRemoveBusiness<
    IModel,
    PagedList<DeployFaceTableModel<FaceDeployControlTask>>
  >;
  @Input()
  load?: EventEmitter<DeployFaceTableArgs>;
  @Input()
  remove?: EventEmitter<FaceDeployControlTask>;

  @Output()
  loaded: EventEmitter<PagedList<DeployFaceTableModel<FaceDeployControlTask>>> =
    new EventEmitter();
  @Output()
  picture: EventEmitter<PictureArgs> = new EventEmitter();
  @Output()
  playback: EventEmitter<VideoArgs> = new EventEmitter();
  @Output()
  details: EventEmitter<FaceDeployControlTask> = new EventEmitter();
  @Output()
  select: EventEmitter<FaceDeployControlTask> = new EventEmitter();

  constructor(business: DeployFaceTableBusiness) {
    this.business = business;
  }
  selected?: DeployFaceTableModel<FaceDeployControlTask>;
  datas: DeployFaceTableModel<FaceDeployControlTask>[] = [];
  widths = ['25%', '14%', '14%', '14%', '14%', '14%', '5%'];
  args: DeployFaceTableArgs = new DeployFaceTableArgs();
  ngOnInit(): void {
    if (!this.load) {
      this.loadData(this.args);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['load']) {
      if (this.load) {
        this.load.subscribe((x) => {
          this.args = x;
          this.loadData(this.args);
        });
      }
    }
    if (changes['remove']) {
      if (this.remove) {
        this.remove.subscribe((x) => {
          this.business.remove(x.TaskId).then((x) => {
            this.loadData(this.args);
          });
        });
      }
    }
  }
  async loadData(args: DeployFaceTableArgs) {
    let paged = await this.business.load(
      args.page ? args.page.PageIndex : 1,
      args.page?.PageSize
    );
    this.datas = paged.Data;
    this.loaded.emit(paged);
  }
  onpicture(e: Event, item: DeployFaceTableModel<FaceDeployControlTask>) {
    let args = new PictureArgs();
    args.id = item.TaskId;
    args.title = item.TaskName;
    args.url = item.ImageData;
    this.picture.emit(args);
    e.stopPropagation();
  }
  onplayback(e: Event, item: DeployFaceTableModel<FaceDeployControlTask>) {
    let args = new VideoArgs();
    if (item.CameraIds && item.CameraIds.length) {
      args.cameraId = item.CameraIds[0];
    }
    args.autoplay = true;
    args.data = item.data;
    args.mode = PlayMode.live;
    args.title = item.TaskName;
    this.playback.emit(args);
    e.stopPropagation();
  }
  ondetails(e: Event, item: DeployFaceTableModel<FaceDeployControlTask>) {
    this.details.emit(item.data);
    e.stopPropagation();
  }
  onitemclicked(item: DeployFaceTableModel<FaceDeployControlTask>) {
    this.selected = item;
    this.select.emit(this.selected.data);
  }
}
