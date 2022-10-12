import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationPath } from 'src/app/components/header-navigation/navigarion-path.enum';
import { IndexProviders } from './index.providers';
import { VideoControlWindowBusiness } from './business/windows/video-control-window.business';
import { IndexWindowBusiness } from './business/windows/index-window.business';
import { IndexEventTriggerBusiness } from './business/index-event-trigger.business';
import { Title } from '@angular/platform-browser';
import { MQTTEventService } from 'src/app/network/request/mqtt-event/mqtt-event.service';
import { StoreService } from 'src/app/tools/service/store.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less'],
  providers: IndexProviders,
})
export class IndexComponent implements OnInit, OnDestroy {
  NavigationPath = NavigationPath;

  title: string = '';
  path = NavigationPath.config_setting;

  constructor(
    public video: VideoControlWindowBusiness,
    public window: IndexWindowBusiness,
    public trigger: IndexEventTriggerBusiness,
    private mqtt: MQTTEventService,
    private store: StoreService,
    title: Title
  ) {
    title.setTitle('结构化管理平台');
  }

  ngOnInit(): void {
    this.mqtt.listenerResourcesEvent();
    this.store.runInterval();
    this.mqtt.pushService.pushEvent.subscribe((x) => {
      this.store.refresh.emit();
    });
  }
  ngOnDestroy(): void {
    this.mqtt.unlistener();
    this.store.clear();
  }
  onnavigate(path: NavigationPath) {
    this.path = path;
  }
}
