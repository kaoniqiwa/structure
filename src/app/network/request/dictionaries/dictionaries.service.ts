import { Injectable } from '@angular/core';
import { KeyValueItem } from 'src/app/models/key-value-item.model';
import {
  BaseRequestService,
  BaseTypeRequestService,
} from '../../base-request.service';
import { HowellAuthHttpService } from '../../howell-auth-http.service';
import { DictionariesUrl } from '../../url/dictionaries/dictionaries.url';
import { CommonsName, PeoplesName, VehiclesName } from './dictionaries.params';

@Injectable({
  providedIn: 'root',
})
export class DictionaryRequestSerivce {
  private basic: BaseRequestService;
  private type: BaseTypeRequestService<KeyValueItem>;

  constructor(http: HowellAuthHttpService) {
    this.basic = new BaseRequestService(http);
    this.type = this.basic.type(KeyValueItem);
  }

  private _people?: DictionaryPeoplesRequestSerivce;
  public get people(): DictionaryPeoplesRequestSerivce {
    if (!this._people) {
      this._people = new DictionaryPeoplesRequestSerivce(this.type);
    }
    return this._people;
  }

  private _vehicle?: DictionaryVehiclesRequestSerivce;
  public get vehicle(): DictionaryVehiclesRequestSerivce {
    if (!this._vehicle) {
      this._vehicle = new DictionaryVehiclesRequestSerivce(this.type);
    }
    return this._vehicle;
  }
  private _commons?: DictionaryCommonsRequestSerivce;
  public get commons(): DictionaryCommonsRequestSerivce {
    if (!this._commons) {
      this._commons = new DictionaryCommonsRequestSerivce(this.type);
    }
    return this._commons;
  }
}

class DictionaryPeoplesRequestSerivce {
  constructor(private type: BaseTypeRequestService<KeyValueItem>) {}
  dictionary: Global.Dictionary<KeyValueItem[]> = {};

  private async cache(key: string) {
    if (this.dictionary[key]) {
      return this.dictionary[key];
    }
    try {
      let result = await this.type.getArray(DictionariesUrl.people(key));
      this.dictionary[key] = result;
    } catch (error) {}
    return this.dictionary[key];
  }

  Glass(): Promise<KeyValueItem<string, boolean>[]> {
    return this.cache(PeoplesName.Glass);
  }
  AgeGroup() {
    return this.cache(PeoplesName.AgeGroup);
  }
  Gender() {
    return this.cache(PeoplesName.Gender);
  }
  Smile() {
    return this.cache(PeoplesName.Smile);
  }
  CertificateType() {
    return this.cache(PeoplesName.CertificateType);
  }
  HairStyle() {
    return this.cache(PeoplesName.HairStyle);
  }
  JacketType() {
    return this.cache(PeoplesName.JacketType);
  }
  JacketColor() {
    return this.cache(PeoplesName.JacketColor);
  }
  Mask() {
    return this.cache(PeoplesName.Mask);
  }
  Hat() {
    return this.cache(PeoplesName.Hat);
  }
  Ride() {
    return this.cache(PeoplesName.Ride);
  }
  Things() {
    return this.cache(PeoplesName.Things);
  }
  TrousersType() {
    return this.cache(PeoplesName.TrousersType);
  }
  TrousersColor() {
    return this.cache(PeoplesName.TrousersColor);
  }
  Bag() {
    return this.cache(PeoplesName.Bag);
  }
  CyclingPersonNumber() {
    return this.cache(PeoplesName.CyclingPersonNumber);
  }
  TargetDirection() {
    return this.cache(PeoplesName.TargetDirection);
  }
  TargetSize() {
    return this.cache(PeoplesName.TargetSize);
  }
  CyclingType() {
    return this.cache(PeoplesName.CyclingType);
  }
}

class DictionaryVehiclesRequestSerivce {
  constructor(private type: BaseTypeRequestService<KeyValueItem>) {}
  dictionary: Global.Dictionary<KeyValueItem[]> = {};
  private async cache(key: string) {
    if (this.dictionary[key]) {
      return this.dictionary[key];
    }
    let result = await this.type.getArray(DictionariesUrl.vehicle(key));
    this.dictionary[key] = result;
    return this.dictionary[key];
  }
  PilotSafebelt() {
    return this.type.getArray(
      DictionariesUrl.vehicle(VehiclesName.PilotSafebelt)
    );
  }
  PilotSunvisor() {
    return this.cache(VehiclesName.PilotSunvisor);
  }
  UsePhone() {
    return this.cache(VehiclesName.UsePhone);
  }
  VehicleColor() {
    return this.cache(VehiclesName.VehicleColor);
  }
  PlateColor() {
    return this.cache(VehiclesName.PlateColor);
  }
  PlateType() {
    return this.cache(VehiclesName.PlateType);
  }
  VehicleColorDepth() {
    return this.cache(VehiclesName.VehicleColorDepth);
  }
  Pendant() {
    return this.cache(VehiclesName.Pendant);
  }
  DangMark() {
    return this.cache(VehiclesName.DangMark);
  }
  Direction() {
    return this.cache(VehiclesName.Direction);
  }
  TissueBox() {
    return this.cache(VehiclesName.TissueBox);
  }
  Copilot() {
    return this.cache(VehiclesName.Copilot);
  }
  VicePilotSunvisor() {
    return this.cache(VehiclesName.VicePilotSunvisor);
  }
  VicePilotSafebelt() {
    return this.cache(VehiclesName.VicePilotSafebelt);
  }
  Pdvs() {
    return this.cache(VehiclesName.Pdvs);
  }
  Decoration() {
    return this.cache(VehiclesName.Decoration);
  }
  VehicleType() {
    return this.cache(VehiclesName.VehicleType);
  }
  PlateState() {
    return this.cache(VehiclesName.PlateState);
  }
  MuckTruck() {
    return this.cache(VehiclesName.MuckTruck);
  }
  MuckTruckCovered() {
    return this.cache(VehiclesName.MuckTruckCovered);
  }
  EnvproSign() {
    return this.cache(VehiclesName.EnvproSign);
  }
  LuggageRack() {
    return this.cache(VehiclesName.LuggageRack);
  }
  SpareTire() {
    return this.cache(VehiclesName.SpareTire);
  }
  SprayPainted() {
    return this.cache(VehiclesName.SprayPainted);
  }
  Label() {
    return this.cache(VehiclesName.Label);
  }
  Sunroof() {
    return this.cache(VehiclesName.Sunroof);
  }
  FrontChild() {
    return this.cache(VehiclesName.FrontChild);
  }
}

class DictionaryCommonsRequestSerivce {
  constructor(private type: BaseTypeRequestService<KeyValueItem>) {}
  dictionary: Global.Dictionary<KeyValueItem[]> = {};
  private async cache(key: string) {
    if (this.dictionary[key]) {
      return this.dictionary[key];
    }
    let result = await this.type.getArray(DictionariesUrl.commons(key));
    this.dictionary[key] = result;
    return this.dictionary[key];
  }
  Nation() {
    return this.cache(CommonsName.Nation);
  }
  CameraType() {
    return this.cache(CommonsName.CameraType);
  }
  CapabilitySet() {
    return this.cache(CommonsName.CapabilitySet);
  }
  IntelligentSet() {
    return this.cache(CommonsName.IntelligentSet);
  }
  ProtocolType() {
    return this.cache(CommonsName.ProtocolType);
  }
  Pixel() {
    return this.cache(CommonsName.Pixel);
  }
  RecordLocation() {
    return this.cache(CommonsName.RecordLocation);
  }
  ResourceType() {
    return this.cache(CommonsName.ResourceType);
  }
  ChannelType() {
    return this.cache(CommonsName.ChannelType);
  }
  TransType() {
    return this.cache(CommonsName.TransType);
  }
  Status() {
    return this.cache(CommonsName.Status);
  }
  CrossingType() {
    return this.cache(CommonsName.CrossingType);
  }
  IntercityType() {
    return this.cache(CommonsName.IntercityType);
  }
  LaneDirection() {
    return this.cache(CommonsName.LaneDirection);
  }
}
