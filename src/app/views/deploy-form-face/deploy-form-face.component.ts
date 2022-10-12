import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateTimePickerView } from 'src/app/directives/date-time-picker/date-time-picker.directive';
import { DeployDetails } from 'src/app/models/deploy-details.model';
import { EventRecord } from 'src/app/models/event-record/event.record';
import { KeyValueItem } from 'src/app/models/key-value-item.model';
import { IModel } from 'src/app/models/model.interface';
import { CreateFaceDeployControlParams } from 'src/app/network/request/commands/commands.params';
import { DateTimeTool } from 'src/app/tools/datetime.tool';
import { DeployFormFaceBusiness } from './deploy-form-face.business';
import {
  IDeployFormFaceBusiness,
  IDeployFormFaceComponent,
} from './deploy-form-face.model';

@Component({
  selector: 'app-deploy-form-face',
  templateUrl: './deploy-form-face.component.html',
  styleUrls: ['./deploy-form-face.component.less'],
  providers: [DeployFormFaceBusiness],
})
export class DeployFormFaceComponent
  implements IDeployFormFaceComponent, OnInit
{
  @Input()
  business: IDeployFormFaceBusiness;
  @Input()
  data?: IModel;
  @Output()
  close: EventEmitter<void> = new EventEmitter();

  constructor(business: DeployFormFaceBusiness) {
    this.business = business;
  }
  DateTimePickerView = DateTimePickerView;
  params: CreateFaceDeployControlParams = new CreateFaceDeployControlParams();

  ngOnInit(): void {
    this.init();
    if (this.data) {
      this.loadData(this.data);
    }
  }

  genders: KeyValueItem[] = [];
  certificateTypes: KeyValueItem[] = [];
  thresholdMin: number = 80;

  async init() {
    this.genders = await this.business.dictionary.people.Gender();

    this.certificateTypes =
      await this.business.dictionary.people.CertificateType();
  }
  touchSpinChange(num: any) {
    if (this.params.Details && this.params.Details.length > 0) {
      this.thresholdMin = num;
    }
  }
  changeBornTime(date: Date) {
    this.params.BeginTime = date;
  }
  changeBeginTime(date: Date) {
    this.params.BeginTime = date;
    if (this.params.Details && this.params.Details.length > 0) {
      this.params.Details[0].StartPeriod = date;
    }
  }
  changeEndTime(date: Date) {
    this.params.EndTime = date;
    if (this.params.Details && this.params.Details.length > 0) {
      this.params.Details[0].StopPeriod = date;
    }
  }
  async loadData(data: IModel) {
    this.params = await this.business.load(data);
    if (this.genders && this.genders.length > 0) {
      this.params.Gender = this.genders[0].Value;
    }
    if (this.certificateTypes && this.certificateTypes.length > 0) {
      this.params.CertificateType = this.certificateTypes[0].Value;
    }
  }

  async ok() {
    if (this.params.Details && this.params.Details.length > 0) {
      this.params.Details[0].ThresholdMin = this.thresholdMin / 100;
    }
    console.log(this.params);
    let result = await this.business.create(this.params);
    console.log(result);
    this.close.emit();
  }
  cancel() {
    this.close.emit();
  }
}
