import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { WindowViewModel } from 'src/app/components/window-control/window.model';
import { EventType } from 'src/app/enums/event-type.enum';
import { EventRecord } from 'src/app/models/event-record/event.record';
import { Medium } from 'src/app/tools/medium';
import { AlarmModel } from '../alarm/alarm.model';
import { DeployInfoBusiness } from './deploy-info.business';
import { DeployInfoModel } from './deploy-info.model';

@Component({
  selector: 'howell-deploy-info',
  templateUrl: './deploy-info.component.html',
  styleUrls: ['./deploy-info.component.less'],
  providers: [DeployInfoBusiness],
})
export class DeployInfoComponent implements OnInit {
  EventType = EventType;

  showToast = false;
  subject = new Subject<EventRecord>();
  model?: DeployInfoModel;
  eventRecord?: EventRecord;

  constructor(private _business: DeployInfoBusiness) {
    this.subject.subscribe((data) => this._init(data));
  }

  ngOnInit(): void {}

  private async _init(args?: EventRecord) {
    // console.log(args);
    if (args) {
      this.eventRecord = args;
      this.model = await this._business.init(args);
      // console.log(this.model);
    }
  }
  closeEvent(flag: boolean) {
    this.showToast = false;
  }
}
