import { Component, Input, OnInit } from '@angular/core';
import { StructuredDataItemModel } from './structured-data-item.model';

@Component({
  selector: 'app-structured-data-item',
  templateUrl: './structured-data-item.component.html',
  styleUrls: ['./structured-data-item.component.less'],
})
export class StructuredDataItemComponent implements OnInit {
  @Input()
  model: StructuredDataItemModel = new StructuredDataItemModel();
  constructor() {}

  ngOnInit(): void {}
}
