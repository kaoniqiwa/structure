import { Component, OnInit } from '@angular/core';
import { DeployMapComponent } from '../deploy-map/deploy-map.component';

@Component({
  selector: 'app-config-setting',
  templateUrl: './config-setting.component.html',
  styleUrls: ['./config-setting.component.less'],
})
export class ConfigSettingComponent implements OnInit {
  path = 'region_node_manage';
  constructor() {}

  ngOnInit(): void {}
}
