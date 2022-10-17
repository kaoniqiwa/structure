import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DateTimePickerView } from 'src/app/directives/date-time-picker/date-time-picker.directive';
import { RegionNodeType } from 'src/app/enums/region-node-type.enum';

import { KeyValueItem } from 'src/app/models/key-value-item.model';
import { IModel } from 'src/app/models/model.interface';
import { CreateFaceDeployControlParams } from 'src/app/network/request/commands/params/create-face-deploy-control.params';
import { DeployFormFaceControlDetailsBusiness } from './business/deploy-form-face-details.business';
import { DeployFormFaceControlRegionNodeTreeBusiness } from './business/deploy-form-face-node.business';

import { DeployFormFaceBusiness } from './business/deploy-form-face.business';
import {
  IDeployFormFaceBusiness,
  IDeployFormFaceComponent,
} from './deploy-form-face.model';

@Component({
  selector: 'app-deploy-form-face',
  templateUrl: './deploy-form-face.component.html',
  styleUrls: ['./deploy-form-face.component.less'],
  providers: [
    DeployFormFaceBusiness,
    DeployFormFaceControlDetailsBusiness,
    DeployFormFaceControlRegionNodeTreeBusiness,
  ],
})
export class DeployFormFaceComponent
  implements IDeployFormFaceComponent, OnInit, OnDestroy
{
  @Input()
  business: IDeployFormFaceBusiness;
  @Input()
  data?: IModel;
  @Output()
  close: EventEmitter<boolean> = new EventEmitter();

  constructor(
    business: DeployFormFaceBusiness,
    public details: DeployFormFaceControlDetailsBusiness,
    public node: DeployFormFaceControlRegionNodeTreeBusiness
  ) {
    this.business = business;
  }
  RegionNodeType = RegionNodeType;
  DateTimePickerView = DateTimePickerView;
  params: CreateFaceDeployControlParams =
    CreateFaceDeployControlParams.Create();

  genders: KeyValueItem[] = [];
  certificateTypes: KeyValueItem[] = [];

  detailsHandle: any;
  nodeHandle: any;
  @ViewChild('file')
  file?: ElementRef;

  ngOnInit(): void {
    this.init();
    if (this.data) {
      this.loadData(this.data);
    }
  }

  async init() {
    this.genders = await this.business.dictionary.people.Gender();

    this.certificateTypes =
      await this.business.dictionary.people.CertificateType();
    this.detailsHandle = this.details.onclose.bind(this.details);
    window.addEventListener('click', this.detailsHandle);
    this.nodeHandle = this.node.onclose.bind(this.node);
    window.addEventListener('click', this.nodeHandle);
  }

  ngOnDestroy(): void {
    window.removeEventListener('click', this.detailsHandle);
    window.removeEventListener('click', this.nodeHandle);
  }
  changeBornTime(date: Date) {
    this.params.BeginTime = date;
  }
  changeBeginTime(date: Date) {
    this.params.BeginTime = date;
  }
  changeEndTime(date: Date) {
    this.params.EndTime = date;
  }
  async loadData(data: IModel) {
    this.params = await this.business.load(data);
    if (this.genders && this.genders.length > 0 && !this.params.Gender) {
      this.params.Gender = this.genders[0].Value;
    }
    this.node.load(this.params.CameraIds);
    if (
      this.certificateTypes &&
      this.certificateTypes.length > 0 &&
      !this.params.CertificateType
    ) {
      this.params.CertificateType = this.certificateTypes[0].Value;
    }
  }

  async ok() {
    console.log(this.params);
    if (this.details.datas && this.details.datas.length > 0) {
      this.params.Details = this.details.datas;
    }
    if (this.node.datas && this.node.datas.length > 0) {
      this.params.CameraIds = this.node.datas.map((x) => x.ResourceId);
    }

    let result = await this.business.create(this.params);
    console.log(result);
    this.close.emit(true);
  }
  cancel() {
    this.close.emit(false);
  }

  //#region update
  onupload() {
    if (this.file) {
      this.file.nativeElement.click();
    }
  }
  fileChange() {
    if (this.file) {
      const t_files = this.file.nativeElement.files;
      if (t_files.length > 0) {
        this.uploadFile(t_files[0]);
        this.file.nativeElement.value = null;
      }
    }
  }
  async uploadFile(file: any) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('loadend', () => {
      let str = reader.result as string;

      this.params.ImageData = str;
      // this.onimage();
    });
  }
  //#endregion
}
