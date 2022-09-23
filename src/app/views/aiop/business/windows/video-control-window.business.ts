import { EventEmitter, Injectable } from '@angular/core';
import {
  VideoModel,
  PlayMode,
} from 'src/app/components/video-player/video.model';
import { VideoWindowViewModel } from 'src/app/components/video-window/video-window.model';
import { IBusiness } from 'src/app/interfaces/business.interface';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/interfaces/converter.interface';
import { Camera } from 'src/app/models/resource/camera.resource';
import { VideoUrl } from 'src/app/models/video-url.model';
import { DurationParams } from 'src/app/network/IParams.interface';
import { SRServerRequestService } from 'src/app/network/request/sr-servers/sr-server.service';

@Injectable()
export class VideoControlWindowBusiness
  extends VideoWindowViewModel
  implements IBusiness<VideoUrl, VideoModel>
{
  private camera?: Camera;

  model?: VideoModel;
  webUrl?: string;

  override style = {
    width: 'calc(1080px + 180px + 10px * 3)',
    height: 'calc(607px + 20px)',
    padding: '0',
    transform: 'translate(-50%, -50%)',
  };

  constructor(
    private srService: SRServerRequestService // private download: DownloadBusiness
  ) {
    super();
  }
  Converter!:
    | IConverter<VideoUrl, VideoModel>
    | IPromiseConverter<VideoUrl, VideoModel>;
  loading?: EventEmitter<void> | undefined;

  // Converter: IConverter<VideoUrl, VideoModel> = new VideoControlConverter();
  async load(camera: Camera): Promise<VideoModel> {
    this.camera = camera;
    this.title = this.camera.Name;
    let url = await this.srService.preview(camera.Id);
    this.webUrl = url.WebUrl;

    let model = VideoModel.fromUrl(url.Url, url.Username, url.Password);
    this.model = model;
    return model;
  }

  getData(
    camera: Camera,
    mode: PlayMode,
    interval?: DurationParams
  ): Promise<VideoUrl> {
    this.camera = camera;
    switch (mode) {
      case PlayMode.vod:
        return this.srService.playback(camera.Id, interval!);
      case PlayMode.live:
      default:
        return this.srService.preview(camera.Id);
    }
  }

  ondownload(args: DurationParams) {
    if (!this.camera) return;

    // this.download.video(this.garbageStation.Id, this.camera.Id, args);
  }
}
