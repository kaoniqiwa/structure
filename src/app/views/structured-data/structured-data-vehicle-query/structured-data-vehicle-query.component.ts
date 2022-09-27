import { Component, OnInit } from '@angular/core';
import { DateTimePickerView } from 'src/app/directives/date-time-picker/date-time-picker.directive';
import { Duration } from 'src/app/models/duration.model';
import { DateTimeTool } from 'src/app/tools/datetime.tool';

@Component({
  selector: 'app-structured-data-vehicle-query',
  templateUrl: './structured-data-vehicle-query.component.html',
  styleUrls: ['./structured-data-vehicle-query.component.less'],
})
export class StructuredDataVehicleQueryComponent implements OnInit {
  constructor() {}
  DateTimePickerView = DateTimePickerView;
  duration: Duration = DateTimeTool.allDay(new Date());
  ngOnInit(): void {}
  changebegin(date: Date) {
    this.duration.begin = date;
  }
  changeend(date: Date) {
    this.duration.end = date;
  }
}
