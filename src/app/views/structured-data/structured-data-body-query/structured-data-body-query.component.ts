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
import { WindowViewModel } from 'src/app/components/window-control/window.model';
import { DateTimePickerView } from 'src/app/directives/date-time-picker/date-time-picker.directive';
import { SelectStrategy } from 'src/app/enums/select-strategy.enum';
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
  SelectStrategy = SelectStrategy;

  model: StructuredDataBodyQueryModel = new StructuredDataBodyQueryModel();
  handle: any;
  expand = false;
  image?: string;
  window: WindowModel = new WindowModel();

  models?: StructuredDataBodyQueryModel[];
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
  cyclingTypes: KeyValueItem[] = [];
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
    this.cyclingTypes = await this.business.cyclingType();
    if (this.cyclingTypes && this.cyclingTypes.length > 0) {
      this.model.CyclingType = this.cyclingTypes[0].Value;
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

  async onimage(image: string) {
    this.image = image;
    if (this.image) {
      this.models = await this.business.load(this.image);
      if (this.models && this.models.length > 0) {
        this.model = this.models[0];
      }
    }
  }

  onquery() {
    let plain = classToPlain(this.model);
    let model = plainToClass(StructuredDataBodyQueryModel, plain);
    model.cameraIds = this.nodes.map((x) => x.ResourceId);
    this.query.emit(model);
  }
  onimagechoose() {
    if (this.image && this.models) {
      this.window.model.show = true;
    }
  }
  onwindowclose(selected: StructuredDataBodyQueryModel) {
    this.window.model.show = false;
    this.model = selected;
  }
}

class WindowModel {
  model: WindowViewModel = new WindowViewModel();
  style = {
    width: 'calc(1200px + 40px)',
    height: 'calc(525px + 40px)',
  };
}
