import { Injectable } from '@angular/core';
import { CommonFlatNode } from 'src/app/components/common-tree/common-flat-node.model';
import { RegionNode } from 'src/app/models/region-node.model';
import { GetRegionNodesParams } from 'src/app/network/request/regions/regions.params';
import { RegionRequestSerivce } from 'src/app/network/request/regions/regions.service';

@Injectable()
export class DeployFormVehicleControlRegionNodeTreeBusiness {
  constructor(private service: RegionRequestSerivce) {}
  expand = false;
  datas: RegionNode[] = [];

  load(cameraIds: string[]) {
    let params = new GetRegionNodesParams();
    params.ResourceIds = cameraIds;
    this.service.node.list(params).then((paged) => {
      this.datas = paged.Data;
    });
  }

  //#region Node
  onclick(event: Event) {
    this.expand = !this.expand;
    event.cancelBubble = true;
  }
  onremove(item: RegionNode): void {
    const index = this.datas.indexOf(item);
    if (index >= 0) {
      this.datas.splice(index, 1);
    }
  }

  onselect(nodes: CommonFlatNode[]) {
    let changed = false;

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (this.datas.map((x) => x.Id).includes(node.Id)) {
        continue;
      }
      if (node.RawData instanceof RegionNode) {
        this.datas.push(node.RawData);
        changed = true;
      }
    }
    if (changed) {
      this.expand = false;
    }
  }
  onclose() {
    this.expand = false;
  }
  //#endregion
}
