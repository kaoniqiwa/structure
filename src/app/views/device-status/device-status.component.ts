import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as echarts from 'echarts/core';
import { GaugeChart, GaugeSeriesOption } from 'echarts/charts';
import { IComponent } from 'src/app/interfaces/component.interfact';
import { IModel } from 'src/app/models/model.interface';
import { DeviceStatusModel } from './device-status.model';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { DeviceStatusBusiness } from './device-status.business';
import { OnlineStatus } from 'src/app/enums/online-status.enum';
import { SeriesOption } from 'echarts';

echarts.use([GaugeChart]);

type ECOption = echarts.ComposeOption<GaugeSeriesOption>;

@Component({
  selector: 'howell-device-status',
  templateUrl: './device-status.component.html',
  styleUrls: ['./device-status.component.less'],
  providers: [DeviceStatusBusiness],
})
export class DeviceStatusComponent
  implements IComponent<IModel, DeviceStatusModel>, OnInit, AfterViewInit
{
  @Input()
  business: IBusiness<IModel, DeviceStatusModel>;
  @Input()
  status?: OnlineStatus;

  constructor(business: DeviceStatusBusiness) {
    this.business = business;
  }

  model: DeviceStatusModel = new DeviceStatusModel();
  @ViewChild('chartContainer') chartContainer?: ElementRef<HTMLElement>;
  myChart: echarts.ECharts | null = null;
  //#region echart option
  option: ECOption = {
    series: [
      {
        type: 'gauge',
        startAngle: 90,
        endAngle: 450,
        radius: '70%',
        progress: {
          show: true,
          width: 3,
          itemStyle: {
            borderWidth: 10,
            borderColor: '#3a93ff',
            color: '#3a93ff',
          },
        },
        // 坐标轴
        axisLine: {
          lineStyle: {
            width: 5,
            opacity: 0.5,
            color: [[1, '#cfd7ff']],
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        pointer: { show: false },

        title: {
          show: true,
          fontSize: 14,
          color: '#99aaff',
          offsetCenter: [0, '20%'],
        },
        detail: {
          show: true,
          offsetCenter: [0, '-10%'],
          formatter: (value?: string | any) => {
            return '{a|' + value + '}{b|%}';
          },
          rich: {
            a: {
              color: 'white',
              fontSize: 28,
              fontWeight: 'normal',
            },
            b: {
              fontSize: 12,
              color: '#cfd7ff',
              // verticalAlign: "bottom",
            },
          },
        },
        data: [
          {
            value: this.model.ratio,
            name: '设备在线率',
          },
        ],
      },
    ],
  };
  //#endregion

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    if (this.chartContainer) {
      this.myChart = echarts.init(this.chartContainer.nativeElement, 'light');
      this.myChart.setOption(this.option);
    }
    this.loadData();
  }
  onResized() {
    this.myChart?.resize();
  }

  async loadData() {
    this.model = await this.business.load(this.status);
    (this.option.series as any)[0].data[0].value = this.model.ratio;
    if (this.myChart) this.myChart.setOption(this.option);
  }
}
