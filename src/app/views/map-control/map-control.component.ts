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
  ViewContainerRef,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ImageControlArrayConverter } from 'src/app/converters/image-control-array.converter';
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
    private changeDetectorRef: ChangeDetectorRef,
    public amap: AMapBusiness,
    public info: PointInfoPanelBusiness,
    private business: MapControlBusiness
  ) {}

  src?: SafeResourceUrl;

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
      this.display.status = false;
    });
  }
  ngOnDestroy(): void {
    if (this.loadHandle) {
      clearTimeout(this.loadHandle);
    }
  }

  display: MapControlDisplay = new MapControlDisplay();

  images: ImageControlModel[] = [];

  imageConverter = new ImageControlArrayConverter();

  selected: Selected = {};

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
    let camera = await this.business.getCamera(this.selected.node.Id);
    this.video.emit(camera);
  }
  onMapClicked() {
    this.display.status = true;
    this.display.videoList = false;
  }
  //#endregion

  Button1Clicked() {
    this.patrol.emit();
  }
  Button2Clicked() {}
  Button3Clicked() {}
  Button4Clicked() {}
}

class MapControlDisplay {
  constructor() {}
  status = true;
  videoList = false;
  videoControl = false;
}

interface Selected {
  node?: RegionNode;
}
