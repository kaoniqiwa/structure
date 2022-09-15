import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { formatDate, Location, PlatformLocation } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { DeployMapBusiness } from './deploy-map.business';

@Component({
  selector: 'howell-deploy-map',
  templateUrl: './deploy-map.component.html',
  styleUrls: ['./deploy-map.component.less'],
  providers: [DeployMapBusiness],
})
export class DeployMapComponent implements OnInit, AfterViewInit {
  mouseLon = 0;
  mouseLat = 0;

  isDragging = false;
  locationDialog = false;
  unbindDialog = false;
  bindDialog = false;

  showOperate = false;
  operateTitle = '';

  // iframe 地址
  srcUrl: SafeResourceUrl = '';

  point: CesiumDataController.Point | null = null;
  position: CesiumDataController.Position | null = null;

  client!: CesiumMapClient;
  mapLoaded = false;

  @ViewChild('iframe') iframe!: ElementRef<HTMLIFrameElement>;

  constructor(
    private _sanitizer: DomSanitizer,
    private _location: PlatformLocation,
    private _toastrService: ToastrService,
    private _business: DeployMapBusiness
  ) {
    this.srcUrl = this._sanitizer.bypassSecurityTrustResourceUrl(
      this._getSrc()
    );
  }

  ngOnInit(): void { }
  ngAfterViewInit(): void {
    this.client = new CesiumMapClient(this.iframe.nativeElement);
    this.client.Events.OnLoading = () => {
      console.log('loading');
    };
    this.client.Events.OnLoaded = () => {
      this._toastrService.success('地图初始化完成');
      this.mapLoaded = true;
    };
    this.client.Events.OnMouseMoving = (lon: number, lat: number) => {
      this.mouseLon = lon;
      this.mouseLat = lat;
    };
    this.client.Events.OnElementDragend = (
      point: CesiumDataController.Point,
      position: CesiumDataController.Position
    ) => {
      this.locationDialog = true;
      this.point = point;
      this.position = position;
    };
    this.client.Events.OnElementsClicked = (objs) => {
      if (!objs || objs.length < 0) return;
      // console.log("点击: ", objs)
      this.point = objs[0] as unknown as CesiumDataController.Point;
      this.client.Viewer.MoveTo(this.point!.position);
    };
    this.client.Events.OnMouseDoubleClick = (position) => {
    };
  }
  dragPoint() {
    this.isDragging = !this.isDragging;
    if (this.isDragging) {
      this._toastrService.success('点位拖拽已开启');
    } else {
      this._toastrService.warning('点位拖拽已关闭');
    }
    this.client.Point.Draggable(this.isDragging);
  }



  private _getSrc() {
    const host = this._location.hostname;
    const port = this._location.port;
    const date = formatDate(new Date(), 'yyyyMMddHHmmss', 'zh-CN');
    return `http://${host}:${port}/amap/map_ts.html?v=${date}`;
  }
}
