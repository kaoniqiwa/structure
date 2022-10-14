import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import Adsame from 'src/assets/echart-theme/adsame.json';
import 'echarts/theme/shine.js';
import 'echarts/theme/vintage.js';
import { components } from '../components/components.module';
import { MaterialModule } from '../material.module';
import { RealtimeComponent } from './realtime/realtime.component';
import { DeployListComponent } from './deploy-list/deploy-list.component';
import { ConfigSettingComponent } from './config-setting/config-setting.component';
import { DeviceStatusComponent } from './device-status/device-status.component';
import { AngularResizeEventModule } from 'angular-resize-event';
import { AlarmComponent } from './alarm/alarm.component';
import { DeployInfoComponent } from './deploy-info/deploy-info.component';
import { MapControlComponents } from './map-control/map-control.module';
import { Directives } from '../directives';
import { Pipes } from '../pipes/pipe.module';
import { IndexComponent } from './index/index.component';
import { WindowComponents } from './windows/windows.module';
import { StructuredDataComponents } from './structured-data/structured-data.module';
import { EventRecordComponents } from './event-record/event-record.module';
import { TableComponents } from './tables/tables.module';
import { DeployListComponents } from './deploy-list/depoly-list.module';
import { DeployMapComponent } from './deploy-map/deploy-map.component';
import { RegionNodeManageComponent } from './region-node-manage/region-node-manage.component';
import { RegionNodeOperateComponent } from './region-node-operate/region-node-operate.component';
import { RegionManageComponent } from './region-manage/region-manage.component';
import { DeployFormFaceComponent } from './deploy-form-face/deploy-form-face.component';
import { DeployFormVehicleComponent } from './deploy-form-vehicle/deploy-form-vehicle.component';
import { DeployFormFacePeriodComponent } from './deploy-form-face/deploy-form-face-period/deploy-form-face-period.component';

echarts.registerTheme('adsame', Adsame);

const ViewComponents = [
  IndexComponent,
  RealtimeComponent,
  ...StructuredDataComponents,
  ConfigSettingComponent,
  ...DeployListComponents,
  ...EventRecordComponents,
  DeviceStatusComponent,
  AlarmComponent,
  DeployInfoComponent,
  DeployMapComponent,
  DeployFormFaceComponent,
  DeployFormFacePeriodComponent,
  RegionNodeOperateComponent,
  RegionNodeManageComponent,
  RegionManageComponent,
  DeployFormVehicleComponent,
  components,
  ...TableComponents,
  ...WindowComponents,
  ...MapControlComponents,
  ...Directives,
  ...Pipes,
];

@NgModule({
  declarations: ViewComponents,
  imports: [
    AngularResizeEventModule,
    MaterialModule,
    CommonModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  exports: [...ViewComponents],
})
export class ViewComponentsModule {}
