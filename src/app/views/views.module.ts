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
import { AiopComponent } from './aiop/aiop.component';
import { components } from '../components/components.module';
import { MaterialModule } from '../material.module';
import { RealtimeComponent } from './realtime/realtime.component';
import { StructuredDataComponent } from './structured-data/structured-data.component';
import { AlarmEventsComponent } from './alarm-events/alarm-events.component';
import { DeployListComponent } from './deploy-list/deploy-list.component';
import { DeviceListComponent } from './device-list/device-list.component';

echarts.registerTheme('adsame', Adsame);

const ViewComponents = [
  AiopComponent,
  RealtimeComponent,
  StructuredDataComponent,
  DeviceListComponent,
  DeployListComponent,
  AlarmEventsComponent,
  components
];

@NgModule({
  declarations: ViewComponents,
  imports: [
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
export class ViewComponentsModule { }
