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
import { Duration } from 'src/app/models/duration.model';
import { KeyValueItem } from 'src/app/models/key-value-item.model';
import { RegionNode } from 'src/app/models/region-node.model';
import { DateTimeTool } from 'src/app/tools/datetime.tool';
import { StructuredDataBodyQueryBusiness } from './structured-data-body-query.business';
import { StructuredDataBodyQueryModel } from './structured-data-body-query.model';

@Component({
  selector: 'app-structured-data-body-query',
  templateUrl: './structured-data-body-query.component.html',
  styleUrls: ['./structured-data-body-query.component.less'],
  providers: [StructuredDataBodyQueryBusiness],
})
export class StructuredDataBodyQueryComponent implements OnInit, OnDestroy {
  @Output()
  query: EventEmitter<StructuredDataBodyQueryModel> = new EventEmitter();
  constructor(public business: StructuredDataBodyQueryBusiness) {}

  DateTimePickerView = DateTimePickerView;

  model: StructuredDataBodyQueryModel = new StructuredDataBodyQueryModel();
  handle: any;
  @ViewChild('file')
  file?: ElementRef;
  expand = false;
  image?: string;
  nodes: RegionNode[] = [];

  ages: KeyValueItem[] = [];
  bags: KeyValueItem<string, boolean>[] = [];
  genders: KeyValueItem[] = [];
  glasses: KeyValueItem<string, boolean>[] = [];
  hairs: KeyValueItem[] = [];
  jacketTypes: KeyValueItem[] = [];
  trousersTypes: KeyValueItem[] = [];
  jacketColors: KeyValueItem[] = [];
  trousersColors: KeyValueItem[] = [];
  hats: KeyValueItem<string, boolean>[] = [];
  rides: KeyValueItem<string, boolean>[] = [];
  masks: KeyValueItem<string, boolean>[] = [];
  things: KeyValueItem<string, boolean>[] = [];

  ngOnInit(): void {
    this.handle = this.onWindowClicked.bind(this);
    window.addEventListener('click', this.handle);
    this.init();
  }
  ngOnDestroy(): void {
    window.removeEventListener('click', this.handle);
  }

  async init() {
    this.ages = await this.business.ageGroup();
    if (this.ages && this.ages.length > 0) {
      this.model.AgeGroup = this.ages[0].Value;
    }
    this.bags = await this.business.bag();
    if (this.bags && this.bags.length > 0) {
      this.model.Bag = this.bags[0].Value;
    }
    this.genders = await this.business.gender();
    if (this.genders && this.genders.length > 0) {
      this.model.Gender = this.genders[0].Value;
    }
    this.glasses = await this.business.glass();
    if (this.glasses && this.glasses.length > 0) {
      this.model.Glass = this.glasses[0].Value;
    }
    this.hairs = await this.business.hairStyle();
    if (this.hairs && this.hairs.length > 0) {
      this.model.HairStyle = this.hairs[0].Value;
    }
    this.hats = await this.business.hat();
    if (this.hats && this.hats.length > 0) {
      this.model.Hat = this.hats[0].Value;
    }
    this.jacketTypes = await this.business.jacketType();
    if (this.jacketTypes && this.jacketTypes.length > 0) {
      this.model.JacketType = this.jacketTypes[0].Value;
    }
    this.trousersTypes = await this.business.trousersType();
    if (this.trousersTypes && this.trousersTypes.length > 0) {
      this.model.TrousersType = this.trousersTypes[0].Value;
    }
    this.jacketColors = await this.business.jacketColor();
    if (this.jacketColors && this.jacketColors.length > 0) {
      this.model.JacketColor = this.jacketColors[0].Value;
    }
    this.trousersColors = await this.business.trousersColor();
    if (this.trousersColors && this.trousersColors.length > 0) {
      this.model.TrousersColor = this.trousersColors[0].Value;
    }
    this.rides = await this.business.ride();
    if (this.rides && this.rides.length > 0) {
      this.model.Ride = this.rides[0].Value;
    }
    this.masks = await this.business.mask();
    if (this.masks && this.masks.length > 0) {
      this.model.Mask = this.masks[0].Value;
    }
    this.things = await this.business.things();
    if (this.things && this.things.length > 0) {
      this.model.Things = this.things[0].Value;
    }
  }

  changebegin(date: Date) {
    this.model.duration.begin = date;
  }
  changeend(date: Date) {
    this.model.duration.end = date;
  }
  onWindowClicked() {
    this.expand = false;
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
  }

  onNodeSelected(nodes: CommonFlatNode[]) {
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

      this.image = str;
      this.onimage();
    });
  }
  //#endregion

  async onimage() {
    if (this.image) {
      let models = await this.business.load(this.image);
      if (models && models.length > 0) {
        this.model = Object.assign(this.model, models[0]);
      }
    }
  }

  onquery() {
    let plain = classToPlain(this.model);
    let model = plainToClass(StructuredDataBodyQueryModel, plain);
    model.cameraIds = this.nodes.map((x) => x.ResourceId);
    // if (model.image) {
    //   let index = model.image.indexOf(',') + 1;
    //   model.image = model.image.substring(index);
    // }
    this.query.emit(model);
  }
}
