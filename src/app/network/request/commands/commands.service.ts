import { Injectable } from '@angular/core';
import { BodyModelingResult } from 'src/app/models/body-modeling-result.model';
import { BodyRecord } from 'src/app/models/body-record.model';
import { FaceDeployControlTask } from 'src/app/models/face-deploy-control-task.model';
import { FaceModelingResult } from 'src/app/models/face-modeling-result.model';
import { FaceRecord } from 'src/app/models/face-record.model';
import { PagedList } from 'src/app/models/page-list.model';
import { VehicleDeployControlTask } from 'src/app/models/vehicle-deploy-control-task.model';
import { VehicleModelingResult } from 'src/app/models/vehicle-modeling-result.model';
import { VehicleRecord } from 'src/app/models/vehicle-record.model';
import { BaseRequestService } from '../../base-request.service';
import { HowellAuthHttpService } from '../../howell-auth-http.service';
import { CommandsUrl } from '../../url/commands/commands.url';
import { BodyImageModelingParams } from './params/body-image-modeling.params';
import { CreateFaceDeployControlParams } from './params/create-face-deploy-control.params';
import { CreateVehicleDeployControlParams } from './params/create-vehicle-deploy-control.params';
import { FaceImageModelingParams } from './params/face-image-modeling.params';
import { GetBodyRecordsByAttributeParams } from './params/get-body-records-by-attribute.params';
import { GetFaceDeployControlTasksParams } from './params/get-face-deploy-control-tasks.params';
import { GetFaceRecordsByAttributeParams } from './params/get-face-records-by-attribute.params';
import { GetFaceRecordsByImageParams } from './params/get-face-records-by-image.params';
import { GetVehicleDeployControlTasksParams } from './params/get-vehicle-deploy-control-tasks.params';
import { GetVehicleRecordsByAttributeParams } from './params/get-vehicle-records-by-attribute.params';
import { SetFaceDeployControlParams } from './params/set-face-deploy-control.params';
import { SetVehicleDeployControlParams } from './params/set-vehicle-deploy-control.params';
import { VehicleImageModelingParams } from './params/vehicle-image-modeling.params';

@Injectable({
  providedIn: 'root',
})
export class CommandRequestSerivce {
  private basic: BaseRequestService;

  constructor(http: HowellAuthHttpService) {
    this.basic = new BaseRequestService(http);
  }

  private _ai?: CommandAIRequestService;
  public get ai(): CommandAIRequestService {
    if (!this._ai) {
      this._ai = new CommandAIRequestService(this.basic);
    }
    return this._ai;
  }
}

class CommandAIRequestService {
  constructor(private basic: BaseRequestService) {}
  private _face?: CommandAIFaceRequestService;
  public get face(): CommandAIFaceRequestService {
    if (!this._face) {
      this._face = new CommandAIFaceRequestService(this.basic);
    }
    return this._face;
  }
  private _vehicle?: CommandAIVehicleRequestService;
  public get vehicle(): CommandAIVehicleRequestService {
    if (!this._vehicle) {
      this._vehicle = new CommandAIVehicleRequestService(this.basic);
    }
    return this._vehicle;
  }
  private _body?: CommandAIBodyRequestService;
  public get body(): CommandAIBodyRequestService {
    if (!this._body) {
      this._body = new CommandAIBodyRequestService(this.basic);
    }
    return this._body;
  }
}

class CommandAIFaceRequestService {
  constructor(private basic: BaseRequestService) {}
  modeling(params: FaceImageModelingParams) {
    let url = CommandsUrl.ai().face().modeling();
    return this.basic.post(url, FaceModelingResult, params);
  }
  private _record?: CommandAIFaceRecordRequestService;
  public get record(): CommandAIFaceRecordRequestService {
    if (!this._record) {
      this._record = new CommandAIFaceRecordRequestService(this.basic);
    }
    return this._record;
  }
  private _deployControl?: CommandAIFaceDeployControlRequestService;
  public get deployControl(): CommandAIFaceDeployControlRequestService {
    if (!this._deployControl) {
      this._deployControl = new CommandAIFaceDeployControlRequestService(
        this.basic
      );
    }
    return this._deployControl;
  }
}

class CommandAIFaceRecordRequestService {
  constructor(private basic: BaseRequestService) {}
  private _query?: CommandAIFaceRecordQureyRequestService;
  public get query(): CommandAIFaceRecordQureyRequestService {
    if (!this._query) {
      this._query = new CommandAIFaceRecordQureyRequestService(this.basic);
    }
    return this._query;
  }
}
class CommandAIFaceRecordQureyRequestService {
  constructor(private basic: BaseRequestService) {}
  attribute(params: GetFaceRecordsByAttributeParams) {
    let url = CommandsUrl.ai().face().record().queryByAttribute();
    return this.basic.paged(url, FaceRecord, params);
  }
  image(params: GetFaceRecordsByImageParams) {
    let url = CommandsUrl.ai().face().record().queryByImage();
    return this.basic.paged(url, FaceRecord, params);
  }
}
class CommandAIFaceDeployControlRequestService {
  constructor(private basic: BaseRequestService) {}
  private _task?: CommandAIFaceRecordDeployControlTaskRequestService;
  public get task(): CommandAIFaceRecordDeployControlTaskRequestService {
    if (!this._task) {
      this._task = new CommandAIFaceRecordDeployControlTaskRequestService(
        this.basic
      );
    }
    return this._task;
  }
}
class CommandAIFaceRecordDeployControlTaskRequestService {
  constructor(private basic: BaseRequestService) {}
  create(params: CreateFaceDeployControlParams) {
    let url = CommandsUrl.ai().face().deployControl().task().basic();
    return this.basic.postReturnString(url, params);
  }
  set(id: string, params: SetFaceDeployControlParams) {
    let url = CommandsUrl.ai().face().deployControl().task().item(id);
    return this.basic.put(url, FaceDeployControlTask, params);
  }
  delete(id: string) {
    let url = CommandsUrl.ai().face().deployControl().task().item(id);
    return this.basic.delete<string>(url, true);
  }
  list(params: GetFaceDeployControlTasksParams) {
    let url = CommandsUrl.ai().face().deployControl().task().list();
    return this.basic.post(url, PagedList<FaceDeployControlTask>, params);
  }
}

class CommandAIVehicleRequestService {
  constructor(private basic: BaseRequestService) {}
  modeling(params: VehicleImageModelingParams) {
    let url = CommandsUrl.ai().vehicle().modeling();
    return this.basic.postArray(url, VehicleModelingResult, params);
  }
  private _record?: CommandAIVehicleRecordQureyRequestService;
  public get record(): CommandAIVehicleRecordQureyRequestService {
    if (!this._record) {
      this._record = new CommandAIVehicleRecordQureyRequestService(this.basic);
    }
    return this._record;
  }
  private _deployControl?: CommandAIVehicleRecordDeployControlTaskRequestService;
  public get deployControl(): CommandAIVehicleRecordDeployControlTaskRequestService {
    if (!this._deployControl) {
      this._deployControl =
        new CommandAIVehicleRecordDeployControlTaskRequestService(this.basic);
    }
    return this._deployControl;
  }
}
class CommandAIVehicleRecordQureyRequestService {
  constructor(private basic: BaseRequestService) {}
  attribute(params: GetVehicleRecordsByAttributeParams) {
    let url = CommandsUrl.ai().vehicle().record().queryByAttribute();
    return this.basic.paged(url, VehicleRecord, params);
  }
}

class CommandAIVehicleRecordDeployControlTaskRequestService {
  constructor(private basic: BaseRequestService) {}
  create(params: CreateVehicleDeployControlParams) {
    let url = CommandsUrl.ai().vehicle().deployControl().task().basic();
    return this.basic.postReturnString(url, params);
  }
  set(id: string, params: SetVehicleDeployControlParams) {
    let url = CommandsUrl.ai().vehicle().deployControl().task().item(id);
    return this.basic.put(url, VehicleDeployControlTask, params);
  }
  delete(id: string) {
    let url = CommandsUrl.ai().vehicle().deployControl().task().item(id);
    return this.basic.delete<string>(url, true);
  }
  list(params: GetVehicleDeployControlTasksParams) {
    let url = CommandsUrl.ai().vehicle().deployControl().task().list();
    return this.basic.post(url, PagedList<VehicleDeployControlTask>, params);
  }
}

class CommandAIBodyRequestService {
  constructor(private basic: BaseRequestService) {}
  modeling(params: BodyImageModelingParams) {
    let url = CommandsUrl.ai().body().modeling();
    return this.basic.postArray(url, BodyModelingResult, params);
  }
  private _record?: CommandAIBodyRecordQureyRequestService;
  public get record(): CommandAIBodyRecordQureyRequestService {
    if (!this._record) {
      this._record = new CommandAIBodyRecordQureyRequestService(this.basic);
    }
    return this._record;
  }
}
class CommandAIBodyRecordQureyRequestService {
  constructor(private basic: BaseRequestService) {}
  attribute(params: GetBodyRecordsByAttributeParams) {
    let url = CommandsUrl.ai().body().record().queryByAttribute();
    return this.basic.paged(url, BodyRecord, params);
  }
}
