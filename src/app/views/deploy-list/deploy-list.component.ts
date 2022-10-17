import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DeployType } from 'src/app/enums/deploy-type.enum';
import { PictureArgs } from 'src/app/models/args/picture.args';
import { VideoArgs } from 'src/app/models/args/video.args';
import { FaceDeployControlTask } from 'src/app/models/face-deploy-control-task.model';
import { Page, PagedList } from 'src/app/models/page-list.model';
import { VehicleDeployControlTask } from 'src/app/models/vehicle-deploy-control-task.model';

type DeployControlTask = FaceDeployControlTask | VehicleDeployControlTask;

@Component({
  selector: 'app-deploy-list',
  templateUrl: './deploy-list.component.html',
  styleUrls: ['./deploy-list.component.less'],
})
export class DeployListComponent implements OnInit {
  @Input()
  load?: EventEmitter<void>;

  @Output()
  picture: EventEmitter<PictureArgs> = new EventEmitter();
  @Output()
  playback: EventEmitter<VideoArgs> = new EventEmitter();
  @Output()
  details: EventEmitter<DeployControlTask> = new EventEmitter();
  @Output()
  deploy: EventEmitter<DeployType> = new EventEmitter();

  constructor() {}
  path: DeployType = DeployType.face;
  DeployType = DeployType;
  selected?: DeployControlTask;
  remove: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {}
  navigation(type: DeployType) {
    this.path = type;
    this.selected = undefined;
  }

  onplayback(args: VideoArgs) {
    this.playback.emit(args);
  }
  onpicture(args: PictureArgs) {
    this.picture.emit(args);
  }
  ondetails(args: DeployControlTask) {
    this.details.emit(args);
  }
  oncreateclicked() {
    this.deploy.emit(this.path);
  }
  onselect(args: DeployControlTask) {
    this.selected = args;
  }
  onremoveclicked() {
    if (this.selected) {
      this.remove.emit(this.selected);
    }
  }
}
