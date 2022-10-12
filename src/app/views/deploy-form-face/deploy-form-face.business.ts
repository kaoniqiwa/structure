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
import { DateTimeTool } from 'src/app/tools/datetime.tool';
import { Medium } from 'src/app/tools/medium';
import { DeployFormFaceConverter } from './deploy-form-face.converter';
import { IDeployFormFaceBusiness } from './deploy-form-face.model';

@Injectable()
export class DeployFormFaceBusiness implements IDeployFormFaceBusiness {
  constructor(
    private command: CommandRequestSerivce,
    public dictionary: DictionaryRequestSerivce
  ) {}
  Converter = new DeployFormFaceConverter();
  loading?: EventEmitter<void> | undefined;
  async load(record: FaceRecord): Promise<CreateFaceDeployControlParams> {
    return this.Converter.Convert(record);
  }
  getData(...args: any): Promise<FaceRecord> {
    throw new Error('Method not implemented.');
  }

  create(params: CreateFaceDeployControlParams) {
    return this.command.ai.face.deployControl.task.create(params);
  }
}
