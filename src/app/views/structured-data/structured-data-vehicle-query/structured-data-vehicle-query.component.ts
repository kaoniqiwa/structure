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
import { StructuredDataVehicleQueryBusiness } from './structured-data-vehicle-query.business';
import { StructuredDataVehicleQueryModel } from './structured-data-vehicle-query.model';

@Component({
  selector: 'app-structured-data-vehicle-query',
  templateUrl: './structured-data-vehicle-query.component.html',
  styleUrls: ['./structured-data-vehicle-query.component.less'],
  providers: [StructuredDataVehicleQueryBusiness],
})
export class StructuredDataVehicleQueryComponent implements OnInit, OnDestroy {
  @Output()
  query: EventEmitter<StructuredDataVehicleQueryModel> = new EventEmitter();
  constructor(private business: StructuredDataVehicleQueryBusiness) {}

  DateTimePickerView = DateTimePickerView;
  SelectStrategy = SelectStrategy;

  models?: StructuredDataVehicleQueryModel[];
  model: StructuredDataVehicleQueryModel =
    new StructuredDataVehicleQueryModel();
  handle: any;
  @ViewChild('file')
  file?: ElementRef;
  expand = false;
  image?: string;
  window: WindowModel = new WindowModel();

  nodes: RegionNode[] = [];

  plateColors: KeyValueItem[] = [];
  plateTypes: KeyValueItem[] = [];
  plateStates: KeyValueItem[] = [];
  vehicleTypes: KeyValueItem[] = [];
  vehicleColors: KeyValueItem[] = [];
  vehicleColorDepths: KeyValueItem[] = [];

  ngOnInit(): void {
    this.handle = this.onWindowClicked.bind(this);
    window.addEventListener('click', this.handle);
    this.init();
  }
  async init() {
    this.plateColors = await this.business.plateColor();
    if (this.plateColors && this.plateColors.length > 0) {
      this.model.PlateColor = this.plateColors[0].Value;
    }
    this.plateTypes = await this.business.plateType();
    if (this.plateTypes && this.plateTypes.length > 0) {
      this.model.PlateType = this.plateTypes[0].Value;
    }
    this.plateStates = await this.business.plateState();
    if (this.plateStates && this.plateStates.length > 0) {
      this.model.PlateState = this.plateStates[0].Value;
    }
    this.vehicleTypes = await this.business.vehicleType();
    if (this.vehicleTypes && this.vehicleTypes.length > 0) {
      this.model.VehicleType = this.vehicleTypes[0].Value;
    }
    this.vehicleColors = await this.business.vehicleColor();
    if (this.vehicleColors && this.vehicleColors.length > 0) {
      this.model.VehicleColor = this.vehicleColors[0].Value;
    }
    this.vehicleColorDepths = await this.business.vehicleColorDepth();
    if (this.vehicleColorDepths && this.vehicleColorDepths.length > 0) {
      this.model.VehicleColorDepth = this.vehicleColorDepths[0].Value;
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('click', this.handle);
  }
  onWindowClicked() {
    this.expand = false;
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
  }

  onNodeSelected(nodes: CommonFlatNode[]) {
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

      this.image = str;
      this.onimage();
    });
  }
  //#endregion
  async onimage() {
    if (this.image) {
      this.models = await this.business.load(this.image);
      if (this.models && this.models.length > 0) {
        this.model = this.models[0];
      }
    }
  }
  onquery() {
    let plain = classToPlain(this.model);
    let model = plainToClass(StructuredDataVehicleQueryModel, plain);
    model.cameraIds = this.nodes.map((x) => x.ResourceId);
    this.query.emit(model);
  }
  onimagechoose() {
    if (this.image && this.models) {
      this.window.model.show = true;
    }
  }
  onwindowclose(selected: StructuredDataVehicleQueryModel) {
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
