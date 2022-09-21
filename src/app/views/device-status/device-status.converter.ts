import { OnlineStatus } from 'src/app/enums/online-status.enum';
import { IConverter } from 'src/app/interfaces/converter.interface';
import { Camera } from 'src/app/models/resource/camera.resource';
import { DeviceStatusModel } from './device-status.model';

export class DeviceStatusConverter
  implements IConverter<Camera[], DeviceStatusModel>
{
  Convert(source: Camera[], ...res: any[]): DeviceStatusModel {
    let model = new DeviceStatusModel();
    model.all = source.length;
    source.forEach((x) => {
      if (x.OnlineStatus === OnlineStatus.online) {
        model.online++;
      } else {
        model.offline++;
      }
    });
    model.ratio = Math.round((model.online / model.all) * 100);
    return model;
  }
}
