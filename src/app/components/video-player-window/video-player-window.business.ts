import { Injectable } from '@angular/core';
import { VideoControlConverter } from 'src/app/converters/video-control.converter';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { IConverter } from 'src/app/interfaces/converter.interface';
import { Duration } from 'src/app/models/duration.model';

import { VideoUrl } from 'src/app/models/video-url.model';
import { DurationParams } from 'src/app/network/IParams.interface';
import { SRServerRequestService } from 'src/app/network/request/sr-servers/sr-server.service';
import { VideoModel, PlayMode } from '../video-player/video.model';

@Injectable()
export class VideoPlayerWindowBusiness
  implements IBusiness<VideoUrl, VideoModel>
{
  constructor(private sr: SRServerRequestService) {}

  Converter: IConverter<VideoUrl, VideoModel> = new VideoControlConverter();
  async load(
    cameraId: string,
    mode: PlayMode,
    duration?: Duration
  ): Promise<VideoModel> {
    let data = await this.getData(cameraId, mode, duration);

    let model = this.Converter.Convert(data);
    return model;
  }
  getData(
    cameraId: string,
    mode: PlayMode,
    duration?: Duration
  ): Promise<VideoUrl> {
    if (mode == PlayMode.live) {
      return this.sr.preview(cameraId);
    } else {
      return this.sr.playback(cameraId, DurationParams.from(duration!));
    }
  }
}
