import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import {
  CommonModelConverter,
  CommonModelSource,
} from 'src/app/converters/common-model.converter';
import { RegionNode } from 'src/app/models/region-node.model';
import { RegionRequestSerivce } from 'src/app/network/request/regions/regions.service';
import { Language } from 'src/app/tools/language';
import { RegionNodeManageModel } from './region-node-manage.model';

@Injectable({
  providedIn: 'root',
})
export class RegionNodeManageConverter extends CommonModelConverter<RegionNodeManageModel> {
  constructor() {
    super();
  }

  Convert(source: CommonModelSource, ...res: any[]) {
    if (source instanceof RegionNode) {
      return this._fromRegionNode(source);
    }
    throw new Error('Error');
  }

  private _fromRegionNode(item: RegionNode) {
    const model = new RegionNodeManageModel();
    model.Id = item.Id;
    model.Name = item.Name;
    model.RegionNodeType = Language.RegionNodeType(item.NodeType);
    model.UpdateTime = item.UpdateTime
      ? formatDate(item.UpdateTime, 'yyyy-MM-dd HH:mm:ss', 'en')
      : '';
    return model;
  }
}
