import { OnlineStatus } from 'src/app/enums/online-status.enum';
import { IConverter } from 'src/app/interfaces/converter.interface';
import { RegionNode } from 'src/app/models/region-node.model';

import { Camera } from 'src/app/models/resource/camera.resource';
import { Medium } from 'src/app/tools/medium';
import { DeviceTableModel } from './device-table.model';

export class DeviceTableConverter
  implements IConverter<Camera[], DeviceTableModel<Camera>[]>
{
  item = new DeviceTableItemConverter();
  Convert(
    source: Camera[],
    getter: {
      node: (id: string) => RegionNode | undefined;
    }
  ): DeviceTableModel<Camera>[] {
    return source.map((x) => {
      return this.item.Convert(x, getter);
    });
  }
}

class DeviceTableItemConverter
  implements IConverter<Camera, DeviceTableModel<Camera>>
{
  Convert(
    source: Camera,
    getter: {
      node: (id: string) => RegionNode | undefined;
    }
  ): DeviceTableModel<Camera> {
    let model = new DeviceTableModel<Camera>();
    model.data = source;
    model.id = source.Id;
    model.img = Medium.img(source.ImageUrl);
    model.name = source.Name;
    model.status = source.OnlineStatus ?? OnlineStatus.offline;

    model.node = getter.node(source.Id);
    model.type = source.ResourceType;
    return model;
  }
}
