import { Component, OnInit } from '@angular/core';
import { NavigationPath } from 'src/app/components/header-navigation/navigarion-path.enum';
import { AIOPProviders } from './aiop.providers';
import { AIOPRealtimeBusiness } from './business/aiop-realtime.business';
import { VideoControlWindowBusiness } from './business/windows/video-control-window.business';

@Component({
  selector: 'app-aiop',
  templateUrl: './aiop.component.html',
  styleUrls: ['./aiop.component.less'],
  providers: AIOPProviders,
})
export class AiopComponent implements OnInit {
  NavigationPath = NavigationPath;

  title: string = '';
  path = NavigationPath.realtime;

  constructor(
    public video: VideoControlWindowBusiness,
    public realtime: AIOPRealtimeBusiness
  ) {}

  ngOnInit(): void {}
  onnavigate(path: NavigationPath) {
    this.path = path;
  }
}
