import { Injectable } from '@angular/core';
import { Region } from 'src/app/models/region.model';
import { RegionRequestSerivce } from 'src/app/network/request/regions/regions.service';
import { RegionManageModel } from './region-manage.model';

@Injectable()
export class RegionManageBusiness {
  constructor(private _regionRequest: RegionRequestSerivce) {}

  async addRegion(parentId: string, model: RegionManageModel) {
    let region = new Region();
    region.Id = '';
    region.ParentId = parentId;
    region.Name = model.Name;
    region.Description = model.Description;
    region.CreateTime = new Date();
    region.UpdateTime = new Date();
    let res = await this._regionRequest.create(region);
    return res;
  }
  async editRegion(id: string, model: RegionManageModel) {
    let region = await this._regionRequest.get(id);
    region.Name = model.Name;
    region.Description = model.Description;
    region.UpdateTime = new Date();

    let res = await this._regionRequest.set(region);
    return res;
  }
  async deleteRegion(id: string) {
    let res = await this._regionRequest.delete(id);
    return res;
  }
}
