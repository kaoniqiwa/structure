import { Injectable } from '@angular/core';
import { PlatformRequestSerivce } from 'src/app/network/request/platform/platform.service';
import { SRServerRequestService } from 'src/app/network/request/sr-servers/sr-server.service';
import { StoreService } from 'src/app/tools/service/store.service';

@Injectable()
export class ConfigSettingBusiness {
  constructor(
    private srService: SRServerRequestService,
    private platform: PlatformRequestSerivce
  ) {}
  //   async syncPassengerServer(id: string) {
  //     this.psService.sync(id);
  //   }
  //   async syncSRServer(serverId: string) {
  //     this.srService.sync(serverId);
  //   }
  //   async getSRserver() {
  //     return await this.srService.array();
  //   }
  //   async getPassengerServer() {
  //     return this.psService.array();
  //   }

  async syncSRServer(serverId: string) {
    this.srService.sync(serverId);
  }
  async getSRserver() {
    return await this.srService.array();
  }
  async syncPlatform(id: string) {
    this.platform.sync(id);
  }
  async getPlatform() {
    let paged = await this.platform.list();
    return paged.Data;
  }
}
