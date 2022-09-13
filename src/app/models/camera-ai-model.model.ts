import { Transform, Type } from 'class-transformer';
import { CameraAIModelType } from 'src/app/enums/camera-ai-model-type.enum';
import { EventObjectFilter } from './event-object-filter.model';
import { IModel } from './model.interface';
import { transformDateTime } from './transform.model';
import { CameraAIModelDTO } from './camera-ai-model-dto.model';

/** CameraAIModel (监控点AI模型)								
ModelId会根据训练的版本改变而改变	*/
export class CameraAIModel implements IModel {
  /**	String	ID	M/R	*/
  Id!: string;
  /**	String	模型ID	O	*/
  ModelId?: string;
  /**	Int32	模型标签图标，[0-n]	M	*/
  Label!: number;
  /**	String	数据集ID	O/R	*/
  DataSetId?: string;
  /**	String	版本	O/R	*/
  Version?: string;
  /**	String	应用类型，一般是设备型号	O/R	*/
  TransformType?: string;
  /**	String	模型类型，默认：AIOP，AIHW	O/R	*/
  ModelType?: CameraAIModelType;

  /**	String	模型名称	O/RW	*/
  ModelName?: string;
  /**	CameraAIModelDTO	模型数据传输对象的格式	O/R	*/
  @Type(() => CameraAIModelDTO)
  ModelDTO?: CameraAIModelDTO;
  /**	String	JSON文件的BASE64，创建时必须填写	M/O	*/
  ModelJSON?: string;

  /**	DateTime	创建时间	M	*/
  @Transform(transformDateTime)
  CreateTime!: Date;
  /**	DateTime	更新时间	M	*/
  @Transform(transformDateTime)
  UpdateTime!: Date;
  /**		过滤策略	O	*/
  Filters?: EventObjectFilter[];
}
