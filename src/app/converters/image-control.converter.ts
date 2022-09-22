import { OnlineStatus } from '../enums/online-status.enum';
import { IConverter } from '../interfaces/converter.interface';
import { ImageControlModel } from '../models/image-control.model';
import { Camera } from '../models/resource/camera.resource';
import { Medium } from '../tools/medium';

export class ImageControlConverter
  implements IConverter<Camera, ImageControlModel>
{
  Convert(source: Camera, onerror = true, eventTime?: Date): ImageControlModel {
    return new ImageControlModel(
      source.Id,
      source.Name,
      Medium.jpg(source.ImageUrl),
      onerror ? Medium.default : '',
      source.OnlineStatus,
      source,
      eventTime
    );
  }
}
