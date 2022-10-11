import { Component, Input, OnInit } from '@angular/core';
import { EventRecord } from 'src/app/models/event-record/event.record';
import { KeyValueItem } from 'src/app/models/key-value-item.model';
import { IModel } from 'src/app/models/model.interface';
import { CreateFaceDeployControlParams } from 'src/app/network/request/commands/commands.params';
import { DeployFormBusiness } from './deploy-form.business';

@Component({
  selector: 'app-deploy-form',
  templateUrl: './deploy-form.component.html',
  styleUrls: ['./deploy-form.component.less'],
  providers: [DeployFormBusiness],
})
export class DeployFormComponent implements OnInit {
  @Input()
  data?: IModel;

  constructor(private business: DeployFormBusiness) {}

  params: CreateFaceDeployControlParams = new CreateFaceDeployControlParams();

  ngOnInit(): void {
    if (this.data) {
      this.loadData(this.data);
    }
  }

  genders: KeyValueItem[] = [];
  certificateTypes: KeyValueItem[] = [];

  async init() {
    this.genders = await this.business.dictionary.people.Gender();
    if (this.genders && this.genders.length > 0) {
      this.params.Gender = this.genders[0].Value;
    }
    this.certificateTypes =
      await this.business.dictionary.people.CertificateType();
    if (this.certificateTypes && this.certificateTypes.length > 0) {
      this.params.CertificateType = this.certificateTypes[0].Value;
    }
  }
  async loadData(data: IModel) {
    this.params = await this.business.load(data);
  }
}
