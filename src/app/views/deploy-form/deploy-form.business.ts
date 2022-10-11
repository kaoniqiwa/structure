import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/interfaces/business.interface';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/interfaces/converter.interface';
import { FaceRecord } from 'src/app/models/face-record.model';
import { IModel } from 'src/app/models/model.interface';
import { CreateFaceDeployControlParams } from 'src/app/network/request/commands/commands.params';
import { CommandRequestSerivce } from 'src/app/network/request/commands/commands.service';
import { DictionaryRequestSerivce } from 'src/app/network/request/dictionaries/dictionaries.service';
import { Medium } from 'src/app/tools/medium';

@Injectable()
export class DeployFormBusiness
  implements IBusiness<FaceRecord, CreateFaceDeployControlParams>
{
  constructor(
    private command: CommandRequestSerivce,
    public dictionary: DictionaryRequestSerivce
  ) {}
  Converter?:
    | IConverter<FaceRecord, CreateFaceDeployControlParams>
    | IPromiseConverter<FaceRecord, CreateFaceDeployControlParams>
    | undefined;
  loading?: EventEmitter<void> | undefined;
  async load(record: IModel): Promise<CreateFaceDeployControlParams> {
    if (record instanceof FaceRecord) {
      return this.face(record);
    }
    throw new Error('DeployFormBusiness load');
  }
  getData(...args: any): Promise<FaceRecord> {
    throw new Error('Method not implemented.');
  }

  face(record: FaceRecord) {
    let params = new CreateFaceDeployControlParams();
    params.Name = record.Name;
    params.BeginTime = record.CaptureTime ?? new Date();
    if (record.CameraId) {
      params.CameraIds = [record.CameraId];
    }
    params.CertificateNumber = record.CertificateNumber;
    params.Gender = record.Gender;
    params.ImageData = Medium.jpg(record.FacePictureUrl);
    return params;
  }

  create(taskName: string, record: FaceRecord) {
    let params = new CreateFaceDeployControlParams();
    params.BeginTime = record.CaptureTime ?? new Date();
    if (record.CameraId) {
      params.CameraIds = [record.CameraId];
    }
    params.TaskName = taskName;
  }
}
