import { Component, OnInit } from '@angular/core';
import { NavigationPath } from 'src/app/components/header-navigation/navigarion-path.enum';
import { IndexProviders } from './index.providers';
import { IndexRealtimeBusiness } from './business/index-realtime.business';
import { VideoControlWindowBusiness } from './business/windows/video-control-window.business';

@Component({
  selector: 'app-aiop',
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
    public realtime: IndexRealtimeBusiness
  ) {}

  ngOnInit(): void {}
  onnavigate(path: NavigationPath) {
    this.path = path;
  }
}
