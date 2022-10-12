import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateTimePickerView } from 'src/app/directives/date-time-picker/date-time-picker.directive';
import { VehicleReason } from 'src/app/enums/vehicle-reason.enum';
import { KeyValueItem } from 'src/app/models/key-value-item.model';
import { IModel } from 'src/app/models/model.interface';
import { CreateVehicleDeployControlParams } from 'src/app/network/request/commands/commands.params';
import { Language } from 'src/app/tools/language';
import { DeployFormVehicleBusiness } from './deploy-form-vehicle.business';

import {
  IDeployFormVehicleBusiness,
  IDeployFormVehicleComponent,
} from './deploy-form-vehicle.model';

@Component({
  selector: 'app-deploy-form-vehicle',
  templateUrl: './deploy-form-vehicle.component.html',
  styleUrls: ['./deploy-form-vehicle.component.less'],
  providers: [DeployFormVehicleBusiness],
})
export class DeployFormVehicleComponent
  implements IDeployFormVehicleComponent, OnInit
{
  @Input()
  business: IDeployFormVehicleBusiness;
  @Input()
  data?: IModel;
  @Output()
  close: EventEmitter<void> = new EventEmitter();

  constructor(business: DeployFormVehicleBusiness) {
    this.business = business;
  }

  DateTimePickerView = DateTimePickerView;
  params: CreateVehicleDeployControlParams =
    new CreateVehicleDeployControlParams();

  ngOnInit(): void {
    this.init();
    this.reasons.push({
      Key: VehicleReason.robbed,
      Value: VehicleReason.robbed,
      Name: Language.VehicleReason(VehicleReason.robbed),
    });
    this.reasons.push({
      Key: VehicleReason.stolen,
      Value: VehicleReason.stolen,
      Name: Language.VehicleReason(VehicleReason.stolen),
    });
    this.reasons.push({
      Key: VehicleReason.suspect,
      Value: VehicleReason.suspect,
      Name: Language.VehicleReason(VehicleReason.suspect),
    });
    if (this.data) {
      this.loadData(this.data);
    }
  }

  plateColors: KeyValueItem[] = [];
  vehicleTypes: KeyValueItem[] = [];
  vehicleColors: KeyValueItem[] = [];
  reasons: KeyValueItem[] = [];

  async init() {
    this.plateColors = await this.business.dictionary.vehicle.PlateColor();
    this.vehicleTypes = await this.business.dictionary.vehicle.VehicleType();
    this.vehicleColors = await this.business.dictionary.vehicle.VehicleColor();
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
    if (this.plateColors && this.plateColors.length > 0) {
      this.params.PlateColor = this.plateColors[0].Value;
    }
    if (this.vehicleTypes && this.vehicleTypes.length > 0) {
      this.params.VehicleType = this.vehicleTypes[0].Value;
    }
    if (this.vehicleColors && this.vehicleColors.length > 0) {
      this.params.VehicleColor = this.vehicleColors[0].Value;
    }
    if (this.reasons && this.reasons.length > 0) {
      this.params.Reason = this.reasons[0].Value;
    }
  }

  async ok() {
    console.log(this.params);
    let result = await this.business.create(this.params);
    console.log(result);
    this.close.emit();
  }
  cancel() {
    this.close.emit();
  }
}
