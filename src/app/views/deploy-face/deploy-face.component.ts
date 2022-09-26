import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { WindowViewModel } from 'src/app/components/window-control/window.model';
import { EventRecord } from 'src/app/models/event-record/event.record';
import { Medium } from 'src/app/tools/medium';
import { AlarmModel } from '../alarm/alarm.model';
import { DeployFaceBusiness } from './deploy-face.business';
import { DeployFaceModel } from './deploy-face.model';

@Component({
  selector: 'howell-deploy-face',
  templateUrl: './deploy-face.component.html',
  styleUrls: ['./deploy-face.component.less'],
  providers: [DeployFaceBusiness],
})
export class DeployFaceComponent implements OnInit {
  showToast = false;
  subject = new Subject<AlarmModel<EventRecord> | null>();
  model: DeployFaceModel | null = null;

  constructor(private _business: DeployFaceBusiness) {
    this.subject.subscribe((data) => this._init(data));
  }

  ngOnInit(): void {}

  private async _init(args: AlarmModel<EventRecord> | null) {
    console.log(args);
    if (args) {
      this.model = await this._business.init(args.data);
      console.log(this.model);
    }
  }
}
