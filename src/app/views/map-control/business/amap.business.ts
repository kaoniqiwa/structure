import { formatDate } from '@angular/common';
import { EventEmitter, Injectable } from '@angular/core';
import { timer } from 'rxjs';
import { OnlineStatus } from 'src/app/enums/online-status.enum';
import { RegionNodeType } from 'src/app/enums/region-node-type.enum';
import { RegionNode } from 'src/app/models/region-node.model';
import { RegionRequestSerivce } from 'src/app/network/request/regions/regions.service';
import { ResourceRequestSerivce } from 'src/app/network/request/resources/resources.service';
import { Language } from 'src/app/tools/language';
import { StoreService } from 'src/app/tools/service/store.service';

@Injectable()
export class AMapBusiness {
  constructor(
    private store: StoreService,
    private regionService: RegionRequestSerivce,
    private resourceService: ResourceRequestSerivce
  ) {
    this.store.interval.subscribe((x) => {
      this.init();
    });
  }

  private mapClient?: CesiumMapClient;
  private mapController?: CesiumDataController.Controller;

  pointDoubleClicked: EventEmitter<RegionNode> = new EventEmitter();

  mapClicked: EventEmitter<void> = new EventEmitter();

  private source: AMapDataSource = {
    all: [],
    drop: [],
    points: {},
  };

  getSrc() {
    const host = document.location.hostname;
    let port = document.location.port;

    //let date = this.datePipe.transform(new Date(), 'yyyyMMddHHmmss');
    const date = formatDate(new Date(), 'yyyyMMddHHmmss', 'en');

    return `http://${host}${
      port ? ':' + port : ''
    }/amap/map_ts_offline.html?v=${date}`;
  }
  loaded = false;
  async init() {
    let promise = this.regionService.node.all();
    return promise.then((x) => {
      this.source.all = x;
      this.setPointStatus(this.source.all);
      if (this.mapClient) {
        this.source.all.forEach((x) => {
          if (this.mapController) {
            this.mapController.Village.Point.Asyn.Get(
              x.RegionId!,
              x.Id,
              (point) => {
                this.source.points[point.id] = point;
              }
            );
          }
        });
      }
    });
  }

  createMapClient(iframe: HTMLIFrameElement) {
    this.mapClient = new CesiumMapClient(iframe);
    this.mapClient.Events.OnLoaded = async () => {
      this.mapController = this.mapClient!.DataController;
      this.init().then(() => {
        timer(0.1 * 1000)
          .toPromise()
          .then(() => {
            this.ChangePoint();
          });
      });

      this.mapClient!.Events.OnElementsDoubleClicked = (elements) => {
        if (elements && elements.length > 0) {
          this.onPointDoubleClicked(
            elements[0] as unknown as CesiumDataController.Point
          );
        }
      };
      this.mapClient!.Events.OnMouseClick = () => {
        this.onMapClicked();
      };

      this.loadDivision(this.store.regionId);

      this.setContentMenu();
    };
  }

  ChangePoint() {
    if (!this.mapController) return;
    for (let i = 0; i < this.source.all.length; i++) {
      const point = this.mapController.Village.Point.Get(
        this.source.all[i].RegionId!,
        this.source.all[i].Id
      );
      if (point) {
        let changed = false;
        this.source.points[point.id] = point;
        if (point.name !== this.source.all[i].Name) {
          point.name = this.source.all[i].Name;
          changed = true;
        }
        if (this.source.all[i].NodeType != undefined) {
          switch (this.source.all[i].NodeType) {
            case RegionNodeType.camera:
              if (point.type != CesiumDataController.ElementType.Camera) {
                point.type = CesiumDataController.ElementType.Camera;
                point.url = 'img/camera.png';
                changed = true;
              }
              break;
            case RegionNodeType.face:
              if (point.type != CesiumDataController.ElementType.Face) {
                point.type = CesiumDataController.ElementType.Face;
                point.url = 'img/face.png';
                changed = true;
              }
              break;
            case RegionNodeType.vehicle:
              if (point.type != CesiumDataController.ElementType.Vehicle) {
                point.type = CesiumDataController.ElementType.Vehicle;
                point.url = 'img/vehicle.png';
                changed = true;
              }
              break;
            default:
              break;
          }
        }
        if (changed) {
          this.mapController.Village.Point.Update(
            this.source.all[i].RegionId!,
            this.source.all[i].Id,
            point
          );
        }
      }
    }
  }

  loadDivision(divisionId: string) {
    if (this.mapClient) {
      this.mapClient.Village.Select(divisionId, true);
      this.mapClient.Viewer.Focus(divisionId);
    }
  }

  divisionSelect(divisionId: string) {
    if (this.mapClient) {
      this.mapClient.Village.Select(divisionId, false);
      this.mapClient.Viewer.Focus(divisionId);
    }
  }

  pointSelect(nodeId: string, regionId?: string) {
    if (this.mapClient) {
      let point = this.source.points[nodeId];
      if (point) {
        this.mapClient.Viewer.MoveTo(point.position);
      }
    }
  }

  onPointDoubleClicked(point: CesiumDataController.Point) {
    let node = this.source.all.find((x) => x.Id === point.id);
    this.pointDoubleClicked.emit(node);
  }

  onMapClicked() {
    this.mapClicked.emit();
  }

  filter(visibility: boolean, type?: RegionNodeType) {
    if (!this.mapClient) return;
    for (let i = 0; i < this.source.all.length; i++) {
      const node = this.source.all[i];
      if (type === undefined || type == node.NodeType) {
        this.mapClient.Point.SetVisibility(node.Id, visibility);
      }
    }
  }

  setPointStatus(nodes: RegionNode[]) {
    console.log('setPointStatus');
    if (!this.mapClient || !nodes || nodes.length === 0) return;

    const arrayStatus = new Array();
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      try {
        const status = {
          id: node.Id,
          status: 0,
        };
        if (node.OnlineStatus == OnlineStatus.offline) {
          status.status = 2;
        }

        arrayStatus.push(status);
      } catch (ex) {
        console.error(ex);
      }
    }
    // console.log(arrayStatus);
    this.mapClient.Point.Status(arrayStatus);
  }

  menuEvents = {
    nodeRecordClicked: new EventEmitter(),
    nodeInformationClicked: new EventEmitter(),
  };

  setContentMenu() {
    if (!this.mapClient) return;
    this.mapClient.ContextMenu.AddItem(
      `<i class="howell-icon-garbagebags" style="font-size: 18px"></i> 点位报警事件`,
      async (id: string) => {
        this.onMapClicked();

        let node = this.source.all.find((x) => x.Id === id);
        if (!node) {
          const node = await this.regionService.node.get(
            this.store.regionId,
            id
          );
          this.source.all.push(node);
        }
        this.menuEvents.nodeRecordClicked.emit(node);
      },
      2
    );

    this.mapClient.ContextMenu.AddItem(
      `<i class="howell-icon-Subsystem" style="font-size: 18px"></i> 点位信息`,
      async (id: string) => {
        this.onMapClicked();
        const status = document.getElementsByClassName(
          'map-bar status'
        )[0] as HTMLElement;
        if (status) {
          status['style'].display = 'none';
        }
        let node = this.source.all.find((x) => x.Id === id);
        if (!node) {
          const node = await this.regionService.node.get(
            this.store.regionId,
            id
          );
          this.source.all.push(node);
        }
        this.menuEvents.nodeInformationClicked.emit(node);
      },
      3
    );
    this.mapClient.ContextMenu.AddItem(
      `<i class="howell-icon-video" style="font-size: 18px"></i> 点位视频`,
      async (id: string) => {
        let node = this.source.all.find((x) => x.Id === id);
        if (!node) {
          const node = await this.regionService.node.get(
            this.store.regionId,
            id
          );
          this.source.all.push(node);
        }
        this.pointDoubleClicked.emit(node);
      },
      4
    );

    this.mapClient.ContextMenu.Enable();
  }
}

interface AMapDataSource {
  all: RegionNode[];
  drop: RegionNode[];
  points: Global.Dictionary<CesiumDataController.Point>;
}
