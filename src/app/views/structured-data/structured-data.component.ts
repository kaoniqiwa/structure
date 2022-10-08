import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PictureArgs } from 'src/app/models/args/picture.args';
import { StructuredDataPath } from './structured-data.model';

@Component({
  selector: 'app-structured-data',
  templateUrl: './structured-data.component.html',
  styleUrls: ['./structured-data.component.less'],
})
export class StructuredDataComponent implements OnInit {
  @Input()
  path: StructuredDataPath = StructuredDataPath.face;
  @Output()
  image: EventEmitter<PictureArgs> = new EventEmitter();
  constructor() {}
  StructuredDataPath = StructuredDataPath;
  ngOnInit(): void {}

  navigation(path: StructuredDataPath) {
    this.path = path;
  }
  onimage(src: PictureArgs) {
    this.image.emit(src);
  }
}
