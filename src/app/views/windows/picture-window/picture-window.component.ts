import { Component, Input, OnInit } from '@angular/core';
import { WindowComponent } from 'src/app/components/window-control/window.component';
import { ImageResult } from 'src/app/models/image-result.model';

@Component({
  selector: 'app-picture-window',
  templateUrl: './picture-window.component.html',
  styleUrls: ['./picture-window.component.less'],
})
export class PictureWindowComponent extends WindowComponent implements OnInit {
  @Input()
  picture?: ImageResult;
  constructor() {
    super();
  }

  override ngOnInit(): void {}
}
