import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ImageControlArrayConverter } from 'src/app/converters/image-control-array.converter';
import { RegionNodeType } from 'src/app/enums/region-node-type.enum';
import { ImageControlModel } from 'src/app/models/image-control.model';
import { RegionNode } from 'src/app/models/region-node.model';
import { Camera } from 'src/app/models/resource/camera.resource';
import { AMapBusiness } from './business/amap.business';
import { MapControlBusiness } from './business/map-control.business';
import { PointInfoPanelBusiness } from './business/point-info-panel.business';
declare var $: any;
@Component({
  selector: 'app-map-control',
  templateUrl: './map-control.component.html',
  styleUrls: ['./map-control.component.less'],
  providers: [AMapBusiness, PointInfoPanelBusiness, MapControlBusiness],
})
export class MapControlComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  //#region Output
  @Output()
  video: EventEmitter<Camera> = new EventEmitter();
  @Output()
  patrol: EventEmitter<void> = new EventEmitter();
  @Input()
  position?: EventEmitter<RegionNode>;

  //#endregion

  constructor(
    private sanitizer: DomSanitizer,
    public amap: AMapBusiness,
    public info: PointInfoPanelBusiness,
    private business: MapControlBusiness
  ) {}

  src?: SafeResourceUrl;
  bar: MapControlBar = new MapControlBar();

  images: ImageControlModel[] = [];

  imageConverter = new ImageControlArrayConverter();

  selected: Selected = {};

  initBar() {
    this.bar.filter.selected.event.subscribe((x) => {
      this.bar.camera.display.value = x;
      this.bar.face.display.value = x;
      this.bar.vehicle.display.value = x;
    });
    this.bar.camera.display.event.subscribe((x) => {
      if (!x) {
        this.bar.camera.selected.value = true;
      }
    });
    this.bar.face.display.event.subscribe((x) => {
      if (!x) {
        this.bar.face.selected.value = true;
      }
    });
    this.bar.vehicle.display.event.subscribe((x) => {
      if (!x) {
        this.bar.vehicle.selected.value = true;
      }
    });
    this.bar.camera.selected.event.subscribe((x) => {
      this.amap.filter(x, RegionNodeType.camera);
    });
    this.bar.face.selected.event.subscribe((x) => {
      this.amap.filter(x, RegionNodeType.face);
    });
    this.bar.vehicle.selected.event.subscribe((x) => {
      this.amap.filter(x, RegionNodeType.vehicle);
    });
  }

  private get iframe(): HTMLIFrameElement | undefined {
    if (this.element && this.element.nativeElement.contentWindow) {
      let _iframe = this.element.nativeElement as HTMLIFrameElement;
      if (_iframe.contentWindow) {
        return _iframe;
      }
    }
    return;
  }

  //#region ViewChild
  @ViewChild('iframe')
  element?: ElementRef;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['position']) {
      if (this.position) {
        this.position.subscribe((x) => {
          this.amap.pointSelect(x.Id);
        });
      }
    }
  }
  ngAfterViewInit(): void {}

  //#region wait
  loadHandle?: NodeJS.Timer;
  private wait(reject: () => void) {
    this.loadHandle = setTimeout(() => {
      if (this.iframe) {
        reject();
      } else {
        this.wait(reject);
      }
    }, 100);
  }
  //#endregion

  ngOnInit(): void {
    let src = this.amap.getSrc();
    this.src = this.sanitizer.bypassSecurityTrustResourceUrl(src);
    this.amap.pointDoubleClicked.subscribe((x) => {
      this.onPointDoubleClicked(x);
      this.info.node = undefined;
    });
    this.amap.mapClicked.subscribe(() => {
      this.onMapClicked();
      this.info.node = undefined;
    });
    this.amap.menuEvents.nodeInformationClicked.subscribe((x) => {
      this.info.node = x;
      this.bar.status = false;
    });
    this.initBar();
  }
  ngOnDestroy(): void {
    if (this.loadHandle) {
      clearTimeout(this.loadHandle);
    }
  }

  //#region template event
  onLoad(event: Event) {
    this.wait(() => {
      this.amap.createMapClient(this.iframe!);
    });
  }
  //#endregion

  //#region map event regist
  async onPointDoubleClicked(node: RegionNode) {
    this.selected.node = node;
    let camera = await this.business.getCamera(this.selected.node.ResourceId);
    this.video.emit(camera);
  }
  onMapClicked() {
    this.bar.status = true;
  }
  //#endregion

  btnToFilterClicked() {
    this.bar.filter.selected.value = !this.bar.filter.selected.value;
  }
  btnFaceFilterClicked() {
    this.bar.face.selected.value = !this.bar.face.selected.value;
  }
  btnVehicleFilterClicked() {
    this.bar.vehicle.selected.value = !this.bar.vehicle.selected.value;
  }

  Button1Clicked() {
    this.patrol.emit();
  }
}

interface Selected {
  node?: RegionNode;
}
class MapControlBar {
  constructor() {}
  filter = new MapControlBarButton(true, false);
  camera = new MapControlBarButton(false, true);
  face = new MapControlBarButton(false, true);
  vehicle = new MapControlBarButton(false, true);
  status: boolean = true;
}
class MapControlBarButton {
  constructor(display: boolean, selected: boolean) {
    this._display = new EventTrigger(display);
    this._selected = new EventTrigger(selected);
  }
  private _display: EventTrigger<boolean>;
  public get display(): EventTrigger<boolean> {
    return this._display;
  }
  public set display(v: EventTrigger<boolean>) {
    this._display = v;
    if (!this._display) {
      this.selected.value = true;
    }
  }

  private _selected: EventTrigger<boolean>;
  public get selected(): EventTrigger<boolean> {
    return this._selected;
  }
  public set selected(v: EventTrigger<boolean>) {
    this._selected = v;
  }
}
class EventTrigger<T> {
  constructor(t: T) {
    this._value = t;
  }
  event: EventEmitter<T> = new EventEmitter();
  private _value: T;
  public get value(): T {
    return this._value;
  }
  public set value(v: T) {
    this._value = v;
    this.event.emit(this._value);
  }
}
