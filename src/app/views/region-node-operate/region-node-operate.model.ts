import { CameraType } from 'src/app/enums/camera-type.enum';
import { RegionNodeType } from 'src/app/enums/region-node-type.enum';
import { ResourceType } from 'src/app/enums/resource-type.enum';
import { PagedList } from 'src/app/models/page-list.model';
import { RegionNode } from 'src/app/models/region-node.model';
import { Camera } from 'src/app/models/resource/camera.resource';
import { Resource } from 'src/app/models/resource/resource.model';

export class RegionNodeOperateModel {
  Id: string = '';
  Name: string = '';
  ResourceId: string = '';
  RegionNodeType: RegionNodeType = RegionNodeType.camera;
  ResourceList!: PagedList<RegionNodeResource>;
}

export class RegionNodeOperateModel2 {
  RegionNode: RegionNode | null = null;
  ResourceList!: PagedList<RegionNodeResource>;
}

export class RegionNodeResource {
  Id!: string;
  Name!: string;
  DetailType!: CameraType;
  DetailTypeName!: string;
  ResourceType!: ResourceType;
  OnlineStatus!: string;
  IsBind!: string;
}

export interface RegionNodeOperateSearch {
  RegionId: string;
  RegionNodeId: string;
  Name: string;
  PageIndex: number;
  PageSize: number;
}
