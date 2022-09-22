import { Injectable } from '@angular/core';
import { Camera } from 'src/app/models/resource/camera.resource';
import {
  BaseRequestService,
  BaseTypeRequestService,
} from '../../base-request.service';
import { HowellAuthHttpService } from '../../howell-auth-http.service';
import { ResourcesUrl } from '../../url/resources/resources.url';
import { GetCamerasParams } from './resources.params';

@Injectable({
  providedIn: 'root',
})
export class ResourceRequestSerivce {
  private basic: BaseRequestService;
  private type: BaseTypeRequestService<Camera>;

  constructor(http: HowellAuthHttpService) {
    this.basic = new BaseRequestService(http);
    this.type = this.basic.type(Camera);
  }

  create(item: Camera) {
    return this.type.post(ResourcesUrl.camera().basic(), item);
  }
  get(id: string): Promise<Camera> {
    return this.type.get(ResourcesUrl.camera().item(id));
  }
  set(item: Camera) {
    return this.type.put(ResourcesUrl.camera().item(item.Id), item);
  }
  delete(id: string) {
    return this.type.delete(ResourcesUrl.camera().item(id));
  }

  list(params: GetCamerasParams = new GetCamerasParams()) {
    return this.type.paged(ResourcesUrl.camera().list(), params);
  }
  async all() {
    let paged = await this.list();
    return paged.Data;
  }
  private _excel?: ResourceCamerasExcelRequestService;
  public get excel(): ResourceCamerasExcelRequestService {
    if (!this._excel) {
      this._excel = new ResourceCamerasExcelRequestService(this.basic);
    }
    return this._excel;
  }
}

class ResourceCamerasExcelRequestService {
  constructor(private basic: BaseRequestService) {}

  upload(data: ArrayBuffer) {
    let url = ResourcesUrl.camera().excel();
    this.basic.http.post<ArrayBuffer, string>(url, data);
  }
  download() {
    let url = ResourcesUrl.camera().excel();
    this.basic.http.getStream(url);
  }
}
