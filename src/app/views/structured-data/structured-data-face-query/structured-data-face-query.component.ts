import { Component, OnInit } from '@angular/core';
import { DateTimePickerView } from 'src/app/directives/date-time-picker.directive';
import { Duration } from 'src/app/models/duration.model';
import { DateTimeTool } from 'src/app/tools/datetime.tool';
import { StructuredDataFaceQueryTab } from './structured-data-face-query.model';

@Component({
  selector: 'app-structured-data-face-query',
  templateUrl: './structured-data-face-query.component.html',
  styleUrls: ['./structured-data-face-query.component.less'],
})
export class StructuredDataFaceQueryComponent implements OnInit {
  tab = StructuredDataFaceQueryTab.picture;
  constructor() {
    this.duration = DateTimeTool.allDay(new Date());
  }
  StructuredDataFaceQueryTab = StructuredDataFaceQueryTab;
  DateTimePickerView = DateTimePickerView;

  duration: Duration;

  ngOnInit(): void {}

  ontabchanged(tab: StructuredDataFaceQueryTab) {
    this.tab = tab;
  }
  changebegin(date: Date) {
    this.duration.begin = date;
  }
  changeend(date: Date) {
    this.duration.end = date;
  }
}
