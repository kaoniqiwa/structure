import { EventRecord } from 'src/app/models/event-record/event.record';
import { IConverter } from '../../interfaces/converter.interface';
import { PictureArgs } from '../../models/args/picture.args';

export class PictureArgsConverter
  implements IConverter<EventRecord, PictureArgs>
{
  static Convert(source: EventRecord, ...res: any[]): PictureArgs {
    let converter = new PictureArgsConverter();
    return converter.Convert(source);
  }

  Convert(source: EventRecord, ...res: any[]): PictureArgs {
    let args = new PictureArgs();
    args.id = source.ImageUrl ?? '';
    args.title = source.ResourceName ?? '';
    return args;
  }
}
