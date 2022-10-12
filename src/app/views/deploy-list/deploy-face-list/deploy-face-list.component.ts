import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { DateTimePickerView } from 'src/app/directives/date-time-picker/date-time-picker.directive';
import { PictureArgs } from 'src/app/models/args/picture.args';
import { VideoArgs } from 'src/app/models/args/video.args';
import { FaceDeployControlTask } from 'src/app/models/face-deploy-control-task.model';
import { Page, PagedList } from 'src/app/models/page-list.model';
import { DeployFaceTableArgs } from '../../tables/deploy/deploy-face-table/deploy-face-table.model';

@Component({
  selector: 'app-deploy-face-list',
  templateUrl: './deploy-face-list.component.html',
  styleUrls: ['./deploy-face-list.component.less'],
})
export class DeployFaceListComponent implements OnInit, AfterViewInit {
  @Output()
  picture: EventEmitter<PictureArgs> = new EventEmitter();
  @Output()
  playback: EventEmitter<VideoArgs> = new EventEmitter();
  @Output()
  details: EventEmitter<FaceDeployControlTask> = new EventEmitter();

  constructor() {}

  args = new DeployFaceTableArgs();
  load: EventEmitter<DeployFaceTableArgs> = new EventEmitter();
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
  ondetails(args: FaceDeployControlTask) {
    this.details.emit(args);
  }
}
