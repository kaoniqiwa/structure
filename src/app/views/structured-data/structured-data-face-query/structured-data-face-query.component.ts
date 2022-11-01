import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { classToPlain, plainToClass } from 'class-transformer';
import { CommonFlatNode } from 'src/app/components/common-tree/common-flat-node.model';
import { DateTimePickerView } from 'src/app/directives/date-time-picker/date-time-picker.directive';
import { SelectStrategy } from 'src/app/enums/select-strategy.enum';
import { KeyValueItem } from 'src/app/models/key-value-item.model';
import { RegionNode } from 'src/app/models/region-node.model';
import { StructuredDataFaceQueryBusiness } from './structured-data-face-query.business';

import {
  StructuredDataFaceQueryByAttributeModel,
  StructuredDataFaceQueryByImageModel,
  StructuredDataFaceQueryModel,
  StructuredDataFaceQueryTab,
} from './structured-data-face-query.model';

@Component({
  selector: 'app-structured-data-face-query',
  templateUrl: './structured-data-face-query.component.html',
  styleUrls: ['./structured-data-face-query.component.less'],
  providers: [StructuredDataFaceQueryBusiness],
})
export class StructuredDataFaceQueryComponent implements OnInit, OnDestroy {
  @Output()
  query: EventEmitter<StructuredDataFaceQueryModel> = new EventEmitter();
  tab = StructuredDataFaceQueryTab.image;
  constructor(private business: StructuredDataFaceQueryBusiness) {}
  StructuredDataFaceQueryTab = StructuredDataFaceQueryTab;
  DateTimePickerView = DateTimePickerView;
  SelectStrategy = SelectStrategy;

  model: StructuredDataFaceQueryModel = new StructuredDataFaceQueryModel();

  @ViewChild('file')
  file?: ElementRef;
  expand = false;
  nodes: RegionNode[] = [];
  genders: KeyValueItem[] = [];
  ages: KeyValueItem[] = [];
  glasses: KeyValueItem<string, boolean>[] = [];
  handle: any;

  nodeSelectedChange: EventEmitter<string[]> = new EventEmitter();

  ngOnInit(): void {
    this.model.image = new StructuredDataFaceQueryByImageModel();
    this.handle = this.onWindowClicked.bind(this);
    window.addEventListener('click', this.handle);
  }

  ngOnDestroy(): void {
    window.removeEventListener('click', this.handle);
  }

  async initGenders() {
    this.genders = await this.business.gender();
    if (this.model.attribute && this.genders.length > 0) {
      this.model.attribute.Gender = this.genders[0].Value;
    }
  }
  async initAges() {
    this.ages = await this.business.ageGroup();
    if (this.model.attribute && this.ages.length > 0) {
      this.model.attribute.AgeGroup = this.ages[0].Value;
    }
  }
  async initGlasses() {
    this.glasses = await this.business.glass();
    if (this.model.attribute && this.glasses.length > 0) {
      this.model.attribute.Glass = this.glasses[0].Value;
    }
  }

  onWindowClicked() {
    this.expand = false;
  }

  ontabchanged(tab: StructuredDataFaceQueryTab) {
    this.tab = tab;
    this.model = new StructuredDataFaceQueryModel();
    switch (tab) {
      case StructuredDataFaceQueryTab.image:
        this.model.image = new StructuredDataFaceQueryByImageModel();
        break;
      case StructuredDataFaceQueryTab.attribute:
      default:
        this.model.attribute = new StructuredDataFaceQueryByAttributeModel();
        this.initAges();
        this.initGenders();
        this.initGlasses();
        break;
    }
  }
  changebegin(date: Date) {
    this.model.duration.begin = date;
  }
  changeend(date: Date) {
    this.model.duration.end = date;
  }

  //#region Node
  onchiplistclicked(event: Event) {
    this.expand = !this.expand;
    event.cancelBubble = true;
  }
  remove(item: RegionNode): void {
    const index = this.nodes.indexOf(item);
    if (index >= 0) {
      this.nodes.splice(index, 1);
    }
    this.nodeSelectedChange.emit([item.Id]);
  }

  onNodeSelected(nodes: CommonFlatNode[]) {
    this.nodes = [];
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (this.nodes.map((x) => x.Id).includes(node.Id)) {
        continue;
      }
      if (node.RawData instanceof RegionNode) {
        this.nodes.push(node.RawData);
      }
    }
  }
  //#endregion
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
      if (this.model.image) {
        this.model.image.image = str;
      }
    });
  }
  //#endregion

  touchSpinChange(num: any) {
    if (this.model.image) {
      this.model.image.similarity = num;
    }
  }
  onquery() {
    let plain = classToPlain(this.model);
    let model = plainToClass(StructuredDataFaceQueryModel, plain);
    model.cameraIds = this.nodes.map((x) => x.ResourceId);
    // if (model.image && model.image.image) {
    //   let index = model.image.image.indexOf(',') + 1;
    //   model.image.image = model.image.image.substring(index);
    // }
    this.query.emit(model);
  }
}
