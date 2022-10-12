import { formatDate, PlatformLocation } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { CommonFlatNode } from 'src/app/components/common-tree/common-flat-node.model';
import { ConfirmDialogModel } from 'src/app/components/confirm-dialog/confirm-dialog.model';
import { RegionTreeSource } from 'src/app/components/region-tree/region-tree.converter';
import { DialogEnum } from 'src/app/enums/dialog.enum';
import { GisType } from 'src/app/enums/gis-type.enum';
import { IconTypeEnum } from 'src/app/enums/icon-type.enum';
import { ICoordinate } from 'src/app/interfaces/coordinate.interface';
import { IDialogMessage } from 'src/app/interfaces/dialog-message.interface';
import { GisPoint } from 'src/app/models/gis-point.model';
import { CameraRegionNode, RegionNode } from 'src/app/models/region-node.model';
import { Region } from 'src/app/models/region.model';
import { CoordinateTransform } from 'src/app/tools/coordinateTransform';
import { DeployMapBusiness } from './deploy-map.business';

@Component({
  selector: 'deploy-map',
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

  locationModel = new ConfirmDialogModel('提示', '是否保存当前位置');
  unbindModel = new ConfirmDialogModel('提示', '是否解除绑定该点位');
  bindModel = new ConfirmDialogModel('提示', '是否绑定该点位');

  // iframe 地址
  srcUrl: SafeResourceUrl = '';

  // 当前选中节点
  currentNode: CommonFlatNode<RegionTreeSource> | null = null;

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

  ngOnInit(): void {}
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
      console.log('双击: ', position);

      this.bindDialog = true;

      if (this.currentNode) {
        let rawData = this.currentNode.RawData;
        if (rawData instanceof CameraRegionNode) {
          if (rawData.Camera.GisPoint) return;
          else {
            this.position = position;
            this.bindDialog = true;
          }
        }
      }
    };
  }
  selectTreeNode(node: CommonFlatNode<RegionTreeSource>[]) {
    this.point = null;
    this.position = null;
    if (!this.mapLoaded) return;
    if (node.length) {
      this.currentNode = node[0];
      console.log(this.currentNode);
      let rawData = this.currentNode.RawData;
      if (rawData instanceof Region) {
        try {
          this.client.Village.Select(rawData.Id);
          let village = this.client.DataController.Village.Get(rawData.Id);
          this.client.Viewer.MoveTo(village.center);
        } catch (e) {
          this._toastrService.error('还未部署该点位');
        }
      } else if (rawData instanceof RegionNode) {
        if (rawData.RegionId) {
          try {
            this.client.Village.Select(rawData.RegionId);

            this.point = this.client.DataController.Village.Point.Get(
              rawData.RegionId,
              rawData.Id
            );
            this.client.Viewer.MoveTo(this.point.position);
          } catch (e) {
            let village = this.client.DataController.Village.Get(
              rawData.RegionId
            );
            this.client.Viewer.MoveTo(village.center);
            this._toastrService.error('还未部署该点位');
          }
        }
      }
    }
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
  // 拖拽点位
  locationDialogMsg(status: DialogEnum) {
    this.locationDialog = false;
    if (status == DialogEnum.confirm) {
      this.locationYesClick();
    } else if (status == DialogEnum.cancel) {
      this.locationCancelClick();
    }
  }
  async locationYesClick() {
    if (this.point && this.position) {
      this.point.position.lon = this.position.lon;
      this.point.position.lat = this.position.lat;

      try {
        this.client.DataController.Village.Point.Update(
          this.point.parentId,
          this.point.id,
          this.point
        );

        let res = await this._updateRegionNode(
          this.position.lon,
          this.position.lat
        );
        if (res) {
          this._toastrService.success('地图数据修改成功');
        }
      } catch (e) {
        this._toastrService.success('地图数据修改失败');
      }
    }
  }
  locationCancelClick() {
    if (this.point) {
      this.client.Point.Remove(this.point.id);
      this.client.Point.Create(this.point);
    }
  }
  linkClicked() {
    this.showOperate = true;
  }
  unlinkClicked() {
    this.unbindDialog = true;
  }

  // 解绑对话框
  unbindDialogMsg(status: DialogEnum) {
    if (status == DialogEnum.confirm) {
      this.unbindYesClick();
    } else if (status == DialogEnum.cancel) {
      // do nothing
    }
    this.unbindDialog = false;
  }
  async unbindYesClick() {
    if (this.currentNode) {
      let rawData = this.currentNode.RawData;
      if (rawData instanceof RegionNode && rawData.RegionId) {
        // 移除地图点位
        this._removePoint(rawData);

        // 更新垃圾厢房点位信息
        this._updateRegionNode();

        // 更新树节点绑定图标
        this._toggleLink();
      }
    }
  }

  bindDialogMsg(status: DialogEnum) {
    if (status == DialogEnum.confirm) {
      if (this.currentNode && this.position) {
        let rawData = this.currentNode.RawData;
        if (rawData instanceof CameraRegionNode) {
          if (rawData.Camera.GisPoint) return;
          this._createPoint(this.position, rawData);
          // 更新垃圾厢房点位信息
          this._updateRegionNode(this.position.lon, this.position.lat);
          // 更新树节点绑定图标
          this._toggleLink();
        }
      }
    } else if (status == DialogEnum.cancel) {
      // do nothing
    }
    this.bindDialog = false;
  }

  // 绑定 - 解绑
  buttonIconClick(node: CommonFlatNode) {
    console.log('buttonIconClick');
    if (node.CurrentButtonIcon != void 0) {
      switch (node.ButtonIconClasses[node.CurrentButtonIcon]) {
        case IconTypeEnum.link:
          this.operateTitle = node.Name;
          this.linkClicked();
          break;
        case IconTypeEnum.unlink:
          this.unlinkClicked();
          break;
      }
    }
  } // 绑定点位
  async coordinateDialogMsg(msg: IDialogMessage<ICoordinate | null>) {
    if (msg.type == DialogEnum.confirm) {
      let data = msg.data;
      if (data && this.currentNode) {
        let rawData = this.currentNode.RawData;
        if (rawData instanceof RegionNode) {
          let gcj02 = CoordinateTransform.bd09togcj02(data.lon, data.lat);
          let position = new CesiumDataController.Position(
            gcj02[0],
            gcj02[1],
            18
          );

          // 创建地图点位
          this._createPoint(position, rawData);

          // 更新垃圾厢房点位信息
          this._updateRegionNode(position.lon, position.lat);

          // 更新树节点绑定图标
          this._toggleLink();
        }
      }
    } else if (msg.type == DialogEnum.cancel) {
      // do nothing
    }
    this.showOperate = false;
  }
  // 给垃圾厢房创建对应的点位
  private _createPoint(
    position: CesiumDataController.Position,
    regionNode: RegionNode
  ) {
    let point = new CesiumDataController.Point();
    point.id = regionNode.Id;
    point.name = regionNode.Name;
    point.parentId = regionNode.RegionId ?? '';
    point.villageId = point.parentId;
    point.type = CesiumDataController.ElementType.Camera;
    point.position = position;
    point.position.height = 18;
    console.log(position);
    try {
      this.client.DataController.Village.Point.Create(
        point.villageId,
        point.id,
        point
      );
      this.client.Point.Create(point);
      this.client.Viewer.MoveTo(point.position);
      this.point = point;
      this.position = point.position;
      this._toastrService.success('点位数据创建成功');
    } catch (e) {
      this._toastrService.error('点位数据创建失败');
    }
  }
  private _removePoint(regionNode: RegionNode) {
    if (regionNode.Id && regionNode.RegionId) {
      try {
        this.client.Point.Remove(regionNode.Id);
        this.client.DataController.Village.Point.Remove(
          regionNode.RegionId,
          regionNode.Id
        );

        this.point = null;
        this.position = null;

        this._toastrService.success('点位数据删除成功');
      } catch (e) {
        this._toastrService.error('点位数据删除失败');
      }
    }
  }
  private async _updateRegionNode(lon?: number, lat?: number) {
    if (this.currentNode) {
      let rawData = this.currentNode.RawData;
      if (rawData instanceof CameraRegionNode) {
        let camera = rawData.Camera;
        if (lon && lat) {
          let gisPoint = new GisPoint();
          gisPoint.Longitude = lon;
          gisPoint.Latitude = lat;
          gisPoint.GisType = GisType.GCJ02;
          camera.GisPoint = gisPoint;
        } else {
          camera.GisPoint = void 0;
        }

        let res = await this._business.updateCamera(camera);
        console.log(res);
        return res;
      }
    }
    return null;
  }
  private _toggleLink() {
    if (!this.currentNode) return;

    // 通过代码自动创建点位时，更改状态，
    if (this.currentNode.ButtonIconClasses.includes(IconTypeEnum.link)) {
      let index = this.currentNode.ButtonIconClasses.indexOf(IconTypeEnum.link);
      this.currentNode.ButtonIconClasses[index] = IconTypeEnum.unlink;
    } else if (
      this.currentNode.ButtonIconClasses.includes(IconTypeEnum.unlink)
    ) {
      let index = this.currentNode.ButtonIconClasses.indexOf(
        IconTypeEnum.unlink
      );
      this.currentNode.ButtonIconClasses[index] = IconTypeEnum.link;
    }
  }

  private _getSrc() {
    const host = this._location.hostname;
    const port = this._location.port;
    const date = formatDate(new Date(), 'yyyyMMddHHmmss', 'zh-CN');
    return `http://${host}:${port}/amap/map_ts_offline.html?v=${date}`;
  }
}

// 121.814062
// 30.901768
