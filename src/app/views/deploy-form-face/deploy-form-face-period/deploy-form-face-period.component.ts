import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { TimeModel } from 'src/app/components/time-control/time-control.model';
import { DateTimePickerView } from 'src/app/directives/date-time-picker/date-time-picker.directive';
import { DeployDetails } from 'src/app/models/deploy-details.model';
import { DateTimeTool } from 'src/app/tools/datetime.tool';

@Component({
  selector: 'app-deploy-form-face-period',
  templateUrl: './deploy-form-face-period.component.html',
  styleUrls: ['./deploy-form-face-period.component.less'],
})
export class DeployFormFacePeriodComponent implements OnInit, OnChanges {
  @Input()
  data?: DeployDetails;

  @Output()
  ok: EventEmitter<DeployDetails> = new EventEmitter();
  @Output()
  cancel: EventEmitter<void> = new EventEmitter();

  constructor() {
    let duration = DateTimeTool.allDay(new Date());
    this.start = new TimeModel(duration.begin);
    this.stop = new TimeModel(duration.end);
  }

  thresholdMin: number = 80;
  stop: TimeModel;
  start: TimeModel;

  DateTimePickerView = DateTimePickerView;
  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      if (this.data) {
        this.thresholdMin = Math.round(this.data.ThresholdMin * 100);

        this.start = new TimeModel(this.data.StartPeriod);
        this.stop = new TimeModel(this.data.StopPeriod);
      }
    }
  }
  touchSpinChange(num: any) {
    this.thresholdMin = num;
  }
  onclick(e: Event) {
    e.stopPropagation();
  }
  onok() {
    let details = new DeployDetails();
    details.StartPeriod = this.start.toDate();
    details.StopPeriod = this.stop.toDate();
    details.ThresholdMin = this.thresholdMin / 100;
    this.ok.emit(details);
  }
  oncancel() {
    this.cancel.emit();
  }
}
