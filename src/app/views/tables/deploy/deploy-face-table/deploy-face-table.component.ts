import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { PictureArgsConverter } from 'src/app/converters/args/picture-args.converter';
import { VideoArgsConverter } from 'src/app/converters/args/video-args.converter';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { IComponent } from 'src/app/interfaces/component.interfact';
import { PictureArgs } from 'src/app/models/args/picture.args';
import { VideoArgs } from 'src/app/models/args/video.args';
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
    IComponent<IModel, PagedList<DeployFaceTableModel>>,
    OnInit,
    OnChanges
{
  @Input()
  business: IBusiness<IModel, PagedList<DeployFaceTableModel>>;
  @Input()
  load?: EventEmitter<DeployFaceTableArgs>;

  @Output()
  loaded: EventEmitter<PagedList<DeployFaceTableModel>> = new EventEmitter();
  @Output()
  picture: EventEmitter<PictureArgs> = new EventEmitter();
  @Output()
  playback: EventEmitter<VideoArgs> = new EventEmitter();

  constructor(business: DeployFaceTableBusiness) {
    this.business = business;
  }

  datas: DeployFaceTableModel[] = [];
  widths = ['20%', '16%', '16%', '16%', '16%', '16%'];
  ngOnInit(): void {
    if (!this.load) {
      this.loadData(new DeployFaceTableArgs());
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['load']) {
      if (this.load) {
        this.load.subscribe((x) => {
          this.loadData(x);
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
  onpicture(e: Event, item: DeployFaceTableModel) {
    let args = PictureArgsConverter.Convert(item.data);
    this.picture.emit(args);
    e.stopPropagation();
  }
  onplayback(e: Event, item: DeployFaceTableModel) {
    let args = VideoArgsConverter.Convert(item.data);
    this.playback.emit(args);
    e.stopPropagation();
  }
  onitemclicked(item: DeployFaceTableModel) {}
}
