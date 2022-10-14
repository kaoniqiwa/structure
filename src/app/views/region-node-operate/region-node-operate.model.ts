import { RegionNodeType } from 'src/app/enums/region-node-type.enum';
import { Resource } from 'src/app/models/resource/resource.model';

export class RegionNodeOperateModel {
  Id: string = '';
  Name: string = '';
  RegionNodeType: RegionNodeType = RegionNodeType.camera;
  ResourceList: Resource[] = [];
}

export class RegionNodeResource {
  Id!: string;
  Name!: string;
}

export interface RegionNodeOperateSearch {
  RegionId: string;
  RegionNodeId: string;
  Name: string;
  PageIndex: number;
  PageSize: number;
}
