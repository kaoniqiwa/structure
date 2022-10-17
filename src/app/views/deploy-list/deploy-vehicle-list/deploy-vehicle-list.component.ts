import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { DateTimePickerView } from 'src/app/directives/date-time-picker/date-time-picker.directive';
import { PictureArgs } from 'src/app/models/args/picture.args';
import { VideoArgs } from 'src/app/models/args/video.args';
import { Page, PagedList } from 'src/app/models/page-list.model';
import { VehicleDeployControlTask } from 'src/app/models/vehicle-deploy-control-task.model';
import { DeployVehicleTableArgs } from '../../tables/deploy/deploy-vehicle-table/deploy-vehicle-table.model';

@Component({
  selector: 'app-deploy-vehicle-list',
  templateUrl: './deploy-vehicle-list.component.html',
  styleUrls: ['./deploy-vehicle-list.component.less'],
})
export class DeployVehicleListComponent implements OnInit, AfterViewInit {
  @Input()
  remove?: EventEmitter<VehicleDeployControlTask>;
  @Output()
  picture: EventEmitter<PictureArgs> = new EventEmitter();
  @Output()
  playback: EventEmitter<VideoArgs> = new EventEmitter();
  @Output()
  details: EventEmitter<VehicleDeployControlTask> = new EventEmitter();
  @Output()
  select: EventEmitter<VehicleDeployControlTask> = new EventEmitter();
  constructor() {}

  args = new DeployVehicleTableArgs();
  load: EventEmitter<DeployVehicleTableArgs> = new EventEmitter();
  page: Page = new Page();
  DateTimePickerView = DateTimePickerView;

  ngOnInit(): void {
    this.args.page = new Page();
    this.args.page.PageIndex = 1;
  }
  ngAfterViewInit(): void {
    this.load.emit(this.args);
  }

  pageEvent(page: PageEvent) {
    if (!this.args.page) {
      this.args.page = new Page();
      this.args.page.PageIndex = 0;
    }
    this.args.page.PageIndex = page.pageIndex + 1;
    this.load.emit(this.args);
  }
  onloaded(paged: PagedList<any>) {
    this.page = paged.Page;
  }
  onsearch() {
    this.load.emit(this.args);
  }
  onplayback(args: VideoArgs) {
    this.playback.emit(args);
  }
  onpicture(args: PictureArgs) {
    this.picture.emit(args);
  }
  ondetails(args: VehicleDeployControlTask) {
    this.details.emit(args);
  }
  onselect(item: VehicleDeployControlTask) {
    this.select.emit(item);
  }
}
