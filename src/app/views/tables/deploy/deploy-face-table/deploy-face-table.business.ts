import { Injectable, EventEmitter } from '@angular/core';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { FaceDeployControlTask } from 'src/app/models/face-deploy-control-task.model';
import { Page, PagedList } from 'src/app/models/page-list.model';
import { GetFaceDeployControlTasksParams } from 'src/app/network/request/commands/commands.params';
import { CommandRequestSerivce } from 'src/app/network/request/commands/commands.service';
import { DateTimeTool } from 'src/app/tools/datetime.tool';
import { DeployFaceTableConverter } from './deploy-face-table.converter';
import { DeployFaceTableModel } from './deploy-face-table.model';

@Injectable()
export class DeployFaceTableBusiness
  implements
    IBusiness<
      PagedList<FaceDeployControlTask>,
      PagedList<DeployFaceTableModel>
    >
{
  constructor(private service: CommandRequestSerivce) {}
  Converter = new DeployFaceTableConverter();
  loading?: EventEmitter<void> | undefined;
  async load(
    index: number,
    size: number = 10
  ): Promise<PagedList<DeployFaceTableModel>> {
    let data = await this.getData(index, size);
    let model = this.Converter.Convert(data);
    return model;
  }
  async getData(
    index: number,
    size: number
  ): Promise<PagedList<FaceDeployControlTask>> {
    let params = new GetFaceDeployControlTasksParams();
    params.PageIndex = index;
    params.PageSize = size;
    return this.service.ai.face.deployControl.task.list(params);
  }
}
