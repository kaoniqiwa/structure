import { Injectable } from '@angular/core';
import { PagedList } from 'src/app/models/page-list.model';
import { GetRegionNodesParams } from 'src/app/network/request/regions/regions.params';
import { RegionRequestSerivce } from 'src/app/network/request/regions/regions.service';
import { LocaleCompare } from 'src/app/tools/locale-compare';
import { RegionNodeManageConverter } from './region-node-manage.converter';
import { RegionNodeManageModel } from './region-node-manage.model';

@Injectable()
export class RegionNodeManageBusiness {
  constructor(
    private _regionRequest: RegionRequestSerivce,
    private _converter: RegionNodeManageConverter
  ) {}

  async listRegionNode(
    regionId: string = '',
    condition: string = '',
    pageIndex: number = 1,
    pageSize: number = 9
  ) {
    let params = new GetRegionNodesParams();
    params.PageIndex = pageIndex;
    params.PageSize = pageSize;
    params.Name = condition;
    params.RegionIds = regionId ? [regionId] : [];
    let { Data, Page } = await this._list(params);
    // console.log(res);
    let data = this._converter.iterateToModel(Data);
    data = data.sort((a, b) => {
      return LocaleCompare.compare(a.Name ?? '', b.Name ?? '');
    });
    let res: PagedList<RegionNodeManageModel> = {
      Page: Page,
      Data: data,
    };
    return res;
  }

  private _list(params: GetRegionNodesParams) {
    return this._regionRequest.node.list(params);
  }

  delete(regionId: string, regionNodeId: string) {
    return this._regionRequest.node.delete(regionId, regionNodeId);
  }
}
