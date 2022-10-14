import { Injectable } from '@angular/core';
import { DeployDetails } from 'src/app/models/deploy-details.model';
import { DateTimeTool } from 'src/app/tools/datetime.tool';

@Injectable()
export class DeployFormFaceControlDetailsBusiness {
  constructor() {
    let duration = DateTimeTool.allDay(new Date());
    this.datas = [
      {
        ThresholdMin: 0.8,
        StartPeriod: duration.begin,
        StopPeriod: duration.end,
      },
    ];
  }

  datas: DeployDetails[];
  selected?: DeployDetails;
  expand = false;

  onclick(event: Event) {
    this.expand = !this.expand;
    this.selected = undefined;
    event.cancelBubble = true;
  }
  onselect(e: Event, item: DeployDetails) {
    console.log(e);
    console.log(item);
    this.selected = item;
    this.expand = true;
    e.stopPropagation();
  }
  onremove(item: DeployDetails): void {
    if (this.datas) {
      const index = this.datas.indexOf(item);
      if (index >= 0) {
        this.datas.splice(index, 1);
      }
    }
  }
  onok(details: DeployDetails) {
    if (!this.datas) {
      this.datas = [];
    }
    let changed = false;
    if (this.selected) {
      let index = this.datas.indexOf(this.selected);
      if (index >= 0) {
        this.datas[index] = details;
        changed = true;
      }
    }
    if (changed == false) {
      this.datas.push(details);
    }

    this.expand = false;
  }

  onclose() {
    this.expand = false;
  }
}
