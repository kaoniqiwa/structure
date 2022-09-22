import { IConverter } from '../interfaces/converter.interface';
import { ImageControlModel } from '../models/image-control.model';
import { Camera } from '../models/resource/camera.resource';
import { ImageControlConverter } from './image-control.converter';

export class ImageControlArrayConverter
  implements IConverter<Camera[], ImageControlModel[]>
{
  itemConverter = new ImageControlConverter();

  Convert(source: Camera[], ...res: any[]): ImageControlModel[] {
    let array: ImageControlModel[] = [];
    for (let i = 0; i < source.length; i++) {
      const item = this.itemConverter.Convert(source[i]);
      array.push(item);
    }
    return array;
  }
}
