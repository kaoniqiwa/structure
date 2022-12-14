import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  TimeDurationModel,
  TimeModel,
} from 'src/app/components/time-control/time-control.model';
import { WindowComponent } from 'src/app/components/window-control/window.component';
import { DateTimePickerView } from 'src/app/directives/date-time-picker/date-time-picker.directive';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { IComponent } from 'src/app/interfaces/component.interfact';
import { IModel } from 'src/app/models/model.interface';
import { ConfigRequestService } from 'src/app/network/request/config/config-request.service';
import { DateTimeTool } from 'src/app/tools/datetime.tool';
import { PlayMode, VideoModel } from '../video-player/video.model';
import { VideoPlayerWindowBusiness } from './video-player-window.business';

@Component({
  selector: 'howell-video-player-window',
  templateUrl: './video-player-window.component.html',
  styleUrls: ['./video-player-window.component.less'],
  providers: [VideoPlayerWindowBusiness],
})
export class VideoPlayerWindowComponent
  extends WindowComponent
  implements IComponent<IModel, VideoModel>, OnInit, OnChanges, OnDestroy
{
  @Input()
  business: IBusiness<IModel, VideoModel>;
  @Input()
  cameraId?: string;
  @Input()
  mode: PlayMode = PlayMode.live;
  @Input()
  time?: Date;
  @Input()
  autoplay: boolean = false;

  constructor(
    business: VideoPlayerWindowBusiness,
    private config: ConfigRequestService
  ) {
    super();
    this.business = business;
  }
  ngOnDestroy(): void {
    this.data = undefined;
  }

  PlayMode = PlayMode;
  date: Date = new Date();
  duration!: Promise<TimeDurationModel>;
  data?: VideoModel;
  DateTimePickerView = DateTimePickerView;

  ngOnInit() {
    this.duration = this.config.getConfig().then((config) => {
      if (this.time) {
        this.date = this.time;
      }
      let duration = DateTimeTool.second(
        this.date,
        config.playback.begin,
        config.playback.end
      );
      return {
        begin: new TimeModel(duration.begin),
        end: new TimeModel(duration.end),
      };
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.time) {
      this.duration = this.config.getConfig().then((config) => {
        if (this.time) {
          this.date = this.time;
        }
        let duration = DateTimeTool.second(
          this.date,
          config.playback.begin,
          config.playback.end
        );
        return {
          begin: new TimeModel(duration.begin),
          end: new TimeModel(duration.end),
        };
      });
    }
    if (this.mode === PlayMode.live) {
      this.autoplay = true;
    }
    if (this.autoplay) {
      this.loadData();
    }
  }

  async loadData() {
    if (this.cameraId) {
      if (this.mode == PlayMode.live) {
        this.preview();
      } else {
        this.playback();
      }
    }
  }
  changeDate(date: Date) {
    this.date = date;
  }
  changeMode(mode: PlayMode) {
    this.mode = mode;
    if (mode == PlayMode.live) {
      this.preview();
    }
  }
  async preview() {
    this.mode = PlayMode.live;
    this.data = await this.business.load(this.cameraId, this.mode);
  }
  webUrl?: string;
  async playback() {
    this.mode = PlayMode.vod;
    this.duration.then((x) => {
      let duration = {
        begin: x.begin.toDate(this.date),
        end: x.end.toDate(this.date),
      };
      this.business.load(this.cameraId, this.mode, duration).then((data) => {
        this.data = data;
      });
    });
  }
}
