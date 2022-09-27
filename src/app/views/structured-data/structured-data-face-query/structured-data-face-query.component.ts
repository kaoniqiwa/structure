import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonFlatNode } from 'src/app/components/common-tree/common-flat-node.model';
import { DateTimePickerView } from 'src/app/directives/date-time-picker.directive';
import { Duration } from 'src/app/models/duration.model';
import { RegionNode } from 'src/app/models/region-node.model';
import { Camera } from 'src/app/models/resource/camera.resource';
import { DateTimeTool } from 'src/app/tools/datetime.tool';
import { StructuredDataFaceQueryTab } from './structured-data-face-query.model';

@Component({
  selector: 'app-structured-data-face-query',
  templateUrl: './structured-data-face-query.component.html',
  styleUrls: ['./structured-data-face-query.component.less'],
})
export class StructuredDataFaceQueryComponent implements OnInit, OnDestroy {
  tab = StructuredDataFaceQueryTab.picture;
  constructor() {
    this.duration = DateTimeTool.allDay(new Date());
  }
  StructuredDataFaceQueryTab = StructuredDataFaceQueryTab;
  DateTimePickerView = DateTimePickerView;

  duration: Duration;
  img?: string;

  @ViewChild('file')
  file?: ElementRef;
  expand = false;
  nodes: RegionNode[] = [];

  handle: any;

  ngOnInit(): void {
    this.handle = this.onWindowClicked.bind(this);
    window.addEventListener('click', this.handle);
  }

  ngOnDestroy(): void {
    window.removeEventListener('click', this.handle);
  }
  onWindowClicked() {
    this.expand = false;
  }

  ontabchanged(tab: StructuredDataFaceQueryTab) {
    this.tab = tab;
  }
  changebegin(date: Date) {
    this.duration.begin = date;
  }
  changeend(date: Date) {
    this.duration.end = date;
  }
  onchiplistclicked(event: Event) {
    this.expand = !this.expand;
    event.cancelBubble = true;
  }
  remove(item: RegionNode): void {
    const index = this.nodes.indexOf(item);
    if (index >= 0) {
      this.nodes.splice(index, 1);
    }
  }

  onCameraSelected(nodes: CommonFlatNode[]) {
    let changed = false;

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (this.nodes.map((x) => x.Id).includes(node.Id)) {
        continue;
      }
      if (node.RawData instanceof RegionNode) {
        this.nodes.push(node.RawData);
        changed = true;
      }
    }
    if (changed) {
      this.expand = false;
    }
  }

  //#region update
  onupload() {
    if (this.file) {
      this.file.nativeElement.click();
    }
  }
  fileChange() {
    if (this.file) {
      const t_files = this.file.nativeElement.files;
      if (t_files.length > 0) {
        this.uploadFile(t_files[0]);
        this.file.nativeElement.value = null;
      }
    }
  }
  async uploadFile(file: any) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('loadend', () => {
      let str = reader.result as string;
      this.img = `url(${str})`;
    });
  }
  //#endregion

  touchSpinChange(num: any) {
    console.log(num);
  }
}
