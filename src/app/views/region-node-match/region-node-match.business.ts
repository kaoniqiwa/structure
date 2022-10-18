import { Injectable } from '@angular/core';
import { GetCamerasParams } from 'src/app/network/request/resources/resources.params';
import { ResourceRequestSerivce } from 'src/app/network/request/resources/resources.service';

@Injectable()
export class RegionNodeMatchBusiness {
  constructor(private _resourceRequest: ResourceRequestSerivce) {}

  private _listResource(name: string, pageIndex: number = 1, pageSize = 9) {
    let params: GetCamerasParams = new GetCamerasParams();
    params.Name = name;
    params.PageIndex = pageIndex;
    params.PageSize = pageSize;
    return this._resourceRequest.list(params);
  }
}
