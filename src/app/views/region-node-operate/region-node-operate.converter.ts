import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import {
  CommonModelConverter,
  CommonModelSource,
} from 'src/app/interfaces/common-model.converter';
import { RegionNode } from 'src/app/models/region-node.model';
import { Camera } from 'src/app/models/resource/camera.resource';
import { RegionRequestSerivce } from 'src/app/network/request/regions/regions.service';
import { Language } from 'src/app/tools/language';
import {
  RegionNodeOperateModel,
  RegionNodeResource,
} from './region-node-operate.model';

@Injectable({
  providedIn: 'root',
})
export class RegionNodeOperateConverter extends CommonModelConverter<RegionNodeResource> {
  constructor() {
    super();
  }

  Convert(source: CommonModelSource, ...res: any[]) {
    if (source instanceof Camera) {
      return this._fromCamera(source);
    }
    throw new Error('Error');
  }

  private _fromCamera(item: Camera) {
    const model = new RegionNodeResource();
    model.Id = item.Id;
    model.Name = item.Name;
    model.ResourceType = item.ResourceType;
    model.DetailType = item.CameraType;
    model.DetailTypeName = Language.CameraType(item.CameraType);
    model.OnlineStatus = Language.OnlineStatus(item.OnlineStatus);
    return model;
  }
}
