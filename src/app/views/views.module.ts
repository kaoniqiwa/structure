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
import { StructuredDataComponent } from './structured-data/structured-data.component';
import { AlarmEventsComponent } from './alarm-events/alarm-events.component';
import { DeployListComponent } from './deploy-list/deploy-list.component';
import { DeviceListComponent } from './device-list/device-list.component';
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

echarts.registerTheme('adsame', Adsame);

const ViewComponents = [
  IndexComponent,
  RealtimeComponent,
  ...StructuredDataComponents,
  DeviceListComponent,
  DeployListComponent,
  AlarmEventsComponent,
  DeviceStatusComponent,
  AlarmComponent,
  DeployInfoComponent,
  components,
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
