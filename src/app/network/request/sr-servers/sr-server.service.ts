import { Injectable } from '@angular/core';
import { classToPlain } from 'class-transformer';
import { StreamType } from 'src/app/enums/stream-type.enum';
import { SRServer } from 'src/app/models/sr-server.model';
import { VideoUrl } from 'src/app/models/video-url.model';
import {
  BaseTypeRequestService,
  BaseRequestService,
} from '../../base-request.service';
import { HowellAuthHttpService } from '../../howell-auth-http.service';
import { DurationParams } from '../../IParams.interface';
import { SRServersUrl } from '../../url/sr-servers/sr-servers.url';
import { GetPreviewUrlParams, GetVodUrlParams } from './sr-server.params';

@Injectable({
  providedIn: 'root',
})
export class SRServerRequestService {
  private type: BaseTypeRequestService<SRServer>;

  constructor(_http: HowellAuthHttpService) {
    this.basic = new BaseRequestService(_http);
    this.type = this.basic.type(SRServer);
  }
  private basic: BaseRequestService;

  preview(cameraId: string, stream?: StreamType): Promise<VideoUrl>;
  preview(params: GetPreviewUrlParams): Promise<VideoUrl>;

  preview(
    args: GetPreviewUrlParams | string,
    stream: StreamType = StreamType.main
  ) {
    let data: any;
    if (typeof args === 'string') {
      let params = new GetPreviewUrlParams();
      params.CameraId = args;
      params.StreamType = stream;
      data = classToPlain(params);
    } else {
      data = classToPlain(args);
    }

    let url = SRServersUrl.preview();
    return this.basic.post(url, VideoUrl, data);
  }

  playback(
    cameraId: string,
    interval: DurationParams,
    stream?: StreamType
  ): Promise<VideoUrl>;
  playback(params: GetVodUrlParams): Promise<VideoUrl>;

  playback(
    args: GetVodUrlParams | string,
    interval?: DurationParams,
    stream: StreamType = StreamType.main
  ) {
    let data: any;

    if (typeof args === 'string') {
      let params = new GetVodUrlParams();
      params.CameraId = args;
      params.BeginTime = interval!.BeginTime;
      params.EndTime = interval!.EndTime;
      params.StreamType = stream;
      data = classToPlain(params);
    } else {
      data = classToPlain(args);
    }

    let url = SRServersUrl.playback();
    return this.basic.post(url, VideoUrl, data);
  }
}
