import { Injectable } from '@angular/core';
import { Platform } from 'src/app/models/platform.model';
import { Protocol } from 'src/app/models/protocol.model';
import {
  BaseRequestService,
  BaseTypeRequestService,
} from '../../base-request.service';
import { HowellAuthHttpService } from '../../howell-auth-http.service';
import { PlatformsUrl } from '../../url/platforms/platforms.url';
import { GetPlatformsParams } from './platforms.params';

@Injectable({
  providedIn: 'root',
})
export class PlatformRequestSerivce {
  private basic: BaseRequestService;
  private type: BaseTypeRequestService<Platform>;

  constructor(_http: HowellAuthHttpService) {
    this.basic = new BaseRequestService(_http);
    this.type = this.basic.type(Platform);
  }

  create(item: Platform) {
    return this.type.post(PlatformsUrl.basic(), item);
  }
  list(params: GetPlatformsParams = new GetPlatformsParams()) {
    return this.type.paged(PlatformsUrl.list(), params);
  }
  get(id: string): Promise<Platform> {
    return this.type.get(PlatformsUrl.item(id));
  }
  set(item: Platform) {
    return this.type.put(PlatformsUrl.item(item.Id), item);
  }
  delete(id: string) {
    return this.type.delete(PlatformsUrl.item(id));
  }
  protocol(): Promise<Protocol> {
    return this.basic.get(PlatformsUrl.protocols(), Protocol);
  }
  sync(id: string) {
    return this.type.post(PlatformsUrl.sync(id));
  }
}
