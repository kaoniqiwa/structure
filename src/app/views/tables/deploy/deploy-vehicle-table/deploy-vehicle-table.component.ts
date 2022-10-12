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
import { VehicleDeployControlTask } from 'src/app/models/vehicle-deploy-control-task.model';
import { DeployVehicleTableBusiness } from './deploy-vehicle-table.business';
import {
  DeployVehicleTableModel,
  DeployVehicleTableArgs,
} from './deploy-vehicle-table.model';

@Component({
  selector: 'app-deploy-vehicle-table',
  templateUrl: './deploy-vehicle-table.component.html',
  styleUrls: ['../../table.less', './deploy-vehicle-table.component.less'],
  providers: [DeployVehicleTableBusiness],
})
export class DeployVehicleTableComponent
  implements
    IComponent<IModel, PagedList<DeployVehicleTableModel>>,
    OnInit,
    OnChanges
{
  @Input()
  business: IBusiness<IModel, PagedList<DeployVehicleTableModel>>;
  @Input()
  load?: EventEmitter<DeployVehicleTableArgs>;

  @Output()
  loaded: EventEmitter<PagedList<DeployVehicleTableModel>> = new EventEmitter();
  @Output()
  picture: EventEmitter<PictureArgs> = new EventEmitter();
  @Output()
  playback: EventEmitter<VideoArgs> = new EventEmitter();
  @Output()
  details: EventEmitter<VehicleDeployControlTask> = new EventEmitter();

  constructor(business: DeployVehicleTableBusiness) {
    this.business = business;
  }

  datas: DeployVehicleTableModel[] = [];
  widths = ['20%', '15%', '15%', '15%', '15%', '15%', '5%'];
  ngOnInit(): void {
    if (!this.load) {
      this.loadData(new DeployVehicleTableArgs());
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
  async loadData(args: DeployVehicleTableArgs) {
    let paged = await this.business.load(
      args.page ? args.page.PageIndex : 1,
      args.page?.PageSize
    );
    this.datas = paged.Data;
    this.loaded.emit(paged);
  }
  onpicture(e: Event, item: DeployVehicleTableModel) {
    let args = PictureArgsConverter.Convert(item.data);
    this.picture.emit(args);
    e.stopPropagation();
  }
  onplayback(e: Event, item: DeployVehicleTableModel) {
    let args = VideoArgsConverter.Convert(item.data);
    this.playback.emit(args);
    e.stopPropagation();
  }
  ondetails(e: Event, item: DeployVehicleTableModel) {
    this.details.emit(item.data);
    e.stopPropagation();
  }
  onitemclicked(item: DeployVehicleTableModel) {}
}
