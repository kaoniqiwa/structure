import { IPromiseConverter } from 'src/app/interfaces/converter.interface';
import { VehicleRecord } from 'src/app/models/vehicle-record.model';
import { CreateVehicleDeployControlParams } from 'src/app/network/request/commands/params/create-vehicle-deploy-control.params';
import { DateTimeTool } from 'src/app/tools/datetime.tool';

export class DeployFormVehicleConverter
  implements IPromiseConverter<VehicleRecord, CreateVehicleDeployControlParams>
{
  async Convert(
    source: VehicleRecord,
    ...res: any[]
  ): Promise<CreateVehicleDeployControlParams> {
    let params = CreateVehicleDeployControlParams.Create();

    params.TaskName = `车辆布控${source.PlateNo ? ':' + source.PlateNo : ''}`;
    params.PlateNo = source.PlateNo ?? '';
    params.PlateColor = source.PlateColor ?? '';
    if (source.CrossingId) {
      params.CrossingIds = [source.CrossingId];
    }
    params.VehicleLogo = source.VehicleLogo;
    params.VehicleType = source.VehicleType;
    params.VehicleColor = source.VehicleColor;

    params.BeginTime = source.CaptureTime ?? new Date();
    params.EndTime = new Date(params.BeginTime.getTime());
    params.EndTime.setDate(params.EndTime.getDate() + 1);
    if (source.CameraId) {
      params.CameraIds = [source.CameraId];
    }
    return params;
  }
}
