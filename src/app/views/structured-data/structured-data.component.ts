import { Component, Input, OnInit } from '@angular/core';
import { StructuredDataPath } from './structured-data.model';

@Component({
  selector: 'app-structured-data',
  templateUrl: './structured-data.component.html',
  styleUrls: ['./structured-data.component.less'],
})
export class StructuredDataComponent implements OnInit {
  @Input()
  path: StructuredDataPath = StructuredDataPath.vehicle;
  constructor() {}
  StructuredDataPath = StructuredDataPath;
  ngOnInit(): void {}

  navigation(path: StructuredDataPath) {
    this.path = path;
  }
}
