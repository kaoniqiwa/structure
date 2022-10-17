import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NavigationPath } from 'src/app/components/header-navigation/navigarion-path.enum';
import { DeployMapComponent } from '../deploy-map/deploy-map.component';
import { ConfigSettingBusiness } from './config-setting.business';

@Component({
  selector: 'app-config-setting',
  templateUrl: './config-setting.component.html',
  styleUrls: ['./config-setting.component.less'],
  providers: [ConfigSettingBusiness],
})
export class ConfigSettingComponent implements OnInit {
  NavigationPath = NavigationPath;

  path = NavigationPath.depoly_map;
  constructor(
    private business: ConfigSettingBusiness,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {}

  async syncPlatform() {
    let platform = await this.business.getPlatform();
    if (platform && platform.length > 0) {
      this.business.syncPlatform(platform[0].Id).then((x) => {
        this.toast.success('同步成功');
      });
    }
  }
  async syncSRServer() {
    let sr = await this.business.getSRserver();
    if (sr && sr.length > 0) {
      this.business.syncSRServer(sr[0].Id).then((x) => {
        this.toast.success('同步成功');
      });
    }
  }
}
