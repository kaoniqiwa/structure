import { IPromiseConverter } from 'src/app/interfaces/converter.interface';
import { FaceRecord } from 'src/app/models/face-record.model';
import { CreateFaceDeployControlParams } from 'src/app/network/request/commands/params/create-face-deploy-control.params';

import { DateTimeTool } from 'src/app/tools/datetime.tool';
import { Medium } from 'src/app/tools/medium';

export class DeployFormFaceConverter
  implements IPromiseConverter<FaceRecord, CreateFaceDeployControlParams>
{
  async Convert(
    source: FaceRecord,
    ...res: any[]
  ): Promise<CreateFaceDeployControlParams> {
    let params = CreateFaceDeployControlParams.Create();
    params.Name = source.Name;

    params.TaskName = `人脸布控${source.Name ? ':' + source.Name : ''}`;
    params.BeginTime = source.CaptureTime ?? new Date();
    if (source.CameraId) {
      params.CameraIds = [source.CameraId];
    }
    params.CertificateNumber = source.CertificateNumber;
    params.Gender = source.Gender;
    params.ImageData = await Medium.base64(source.FacePictureUrl);

    return params;
  }
}
