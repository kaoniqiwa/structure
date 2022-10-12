import { IPromiseConverter } from "src/app/interfaces/converter.interface";
import { VehicleRecord } from "src/app/models/vehicle-record.model";
import { CreateVehicleDeployControlParams } from "src/app/network/request/commands/commands.params";
import { DateTimeTool } from "src/app/tools/datetime.tool";
import { Medium } from "src/app/tools/medium";

export class DeployFormVehicleConverter
  implements IPromiseConverter<VehicleRecord, CreateVehicleDeployControlParams>
{
  async Convert(
    source: VehicleRecord,
    ...res: any[]
  ): Promise<CreateVehicleDeployControlParams> {
    let params = new CreateVehicleDeployControlParams();
    let duration = DateTimeTool.allDay(new Date());
    duration.end.setDate(duration.end.getDate() + 1);
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;

    params.TaskName = `车辆布控${source.PlateNo ? ':' + source.PlateNo : ''}`;
    params.PlateNo = source.PlateNo??""
    params.PlateColor = source.PlateColor??""
    if(source.CrossingId)
    {
      params.CrossingIds = [source.CrossingId]
    }
    params.VehicleLogo = source.VehicleLogo;
    params.VehicleType = source.VehicleType;
    params.VehicleColor = source.VehicleColor

    params.BeginTime = source.CaptureTime ?? new Date();
    if (source.CameraId) {
      params.CameraIds = [source.CameraId];
    }
    return params;
  }
}
