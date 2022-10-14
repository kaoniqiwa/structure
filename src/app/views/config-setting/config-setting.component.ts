import { Component, OnInit } from '@angular/core';
import { NavigationPath } from 'src/app/components/header-navigation/navigarion-path.enum';
import { DeployMapComponent } from '../deploy-map/deploy-map.component';

@Component({
  selector: 'app-config-setting',
  templateUrl: './config-setting.component.html',
  styleUrls: ['./config-setting.component.less'],
})
export class ConfigSettingComponent implements OnInit {
  NavigationPath = NavigationPath;

  path = NavigationPath.depoly_map;
  constructor() {}

  ngOnInit(): void {}
}
