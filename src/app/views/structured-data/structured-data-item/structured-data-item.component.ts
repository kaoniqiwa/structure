import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  StructuredDataItemImageArgs,
  StructuredDataItemModel,
} from './structured-data-item.model';

@Component({
  selector: 'app-structured-data-item',
  templateUrl: './structured-data-item.component.html',
  styleUrls: ['./structured-data-item.component.less'],
})
export class StructuredDataItemComponent implements OnInit {
  @Input()
  model: StructuredDataItemModel = new StructuredDataItemModel();
  @Output()
  imageClick: EventEmitter<StructuredDataItemImageArgs> = new EventEmitter();
  @Output()
  click: EventEmitter<StructuredDataItemModel> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onimage(e: Event, index: number) {
    let args = new StructuredDataItemImageArgs();
    args.index = index;
    args.model = this.model;
    this.imageClick.emit(args);
    e.stopPropagation();
  }
  onclick(e: Event) {
    this.click.emit(this.model);
    e.stopPropagation();
  }
}
