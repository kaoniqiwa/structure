import { Component, OnInit } from '@angular/core';
import { NavigationPath } from 'src/app/components/header-navigation/navigarion-path.enum';
import { IndexProviders } from './index.providers';
import { VideoControlWindowBusiness } from './business/windows/video-control-window.business';
import { IndexWindowBusiness } from './business/windows/index-window.business';
import { IndexEventTriggerBusiness } from './business/index-event-trigger.business';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less'],
  providers: IndexProviders,
})
export class IndexComponent implements OnInit {
  NavigationPath = NavigationPath;

  title: string = '';
  path = NavigationPath.realtime;

  constructor(
    public video: VideoControlWindowBusiness,
    public window: IndexWindowBusiness,
    public trigger: IndexEventTriggerBusiness
  ) {}

  ngOnInit(): void {}
  onnavigate(path: NavigationPath) {
    this.path = path;
  }
}
