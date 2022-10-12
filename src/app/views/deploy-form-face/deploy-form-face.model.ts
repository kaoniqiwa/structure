import { IBusiness } from 'src/app/interfaces/business.interface';
import { IComponent } from 'src/app/interfaces/component.interfact';
import { FaceRecord } from 'src/app/models/face-record.model';
import { CreateFaceDeployControlParams } from 'src/app/network/request/commands/commands.params';
import { DictionaryRequestSerivce } from 'src/app/network/request/dictionaries/dictionaries.service';

export interface IDeployFormFaceComponent
  extends IComponent<FaceRecord, CreateFaceDeployControlParams> {
  business: IDeployFormFaceBusiness;
}
export interface IDeployFormFaceBusiness
  extends IBusiness<FaceRecord, CreateFaceDeployControlParams> {
  dictionary: DictionaryRequestSerivce;
  create(params: CreateFaceDeployControlParams): Promise<string>;
}
