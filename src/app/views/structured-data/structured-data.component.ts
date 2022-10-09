import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DeployType } from 'src/app/enums/deploy-type.enum';
import { PictureArgs } from 'src/app/models/args/picture.args';

@Component({
  selector: 'app-structured-data',
  templateUrl: './structured-data.component.html',
  styleUrls: ['./structured-data.component.less'],
})
export class StructuredDataComponent implements OnInit {
  @Input()
  path: DeployType = DeployType.face;
  @Output()
  image: EventEmitter<PictureArgs> = new EventEmitter();
  constructor() {}
  DeployType = DeployType;
  ngOnInit(): void {}

  navigation(path: DeployType) {
    this.path = path;
  }
  onimage(src: PictureArgs) {
    this.image.emit(src);
  }
}
