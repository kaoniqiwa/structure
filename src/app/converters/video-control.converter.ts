import { VideoModel } from '../components/video-player/video.model';
import { IConverter } from '../interfaces/converter.interface';
import { VideoUrl } from '../models/video-url.model';

export class VideoControlConverter implements IConverter<VideoUrl, VideoModel> {
  Convert(source: VideoUrl, ...res: any[]): VideoModel {
    let model = new VideoModel(source.Url);
    if (!model.username) {
      model.username = source.Username;
    }
    if (!model.password) {
      model.password = source.Password;
    }
    return model;
  }
}
