import { Transform, Type } from 'class-transformer';
import { DeployDetails } from 'src/app/models/deploy-details.model';
import {
  transformImageData,
  transformParams,
} from 'src/app/models/transform.model';
import { DurationParams } from 'src/app/network/IParams.interface';
import { DateTimeTool } from 'src/app/tools/datetime.tool';

export class CreateFaceDeployControlParams extends DurationParams {
  /**	String	布控名称	M */
  TaskName!: string;
  /**	String[]	布控相机ID，最多传2000个	M */
  CameraIds!: string[];
  /**	String	图片base64数据	O */
  @Transform(transformImageData)
  ImageData?: string;
  /**	String	姓名	O */
  Name?: string;
  /**	String	性别，参见：2.3.12.1	O */
  @Transform(transformParams)
  Gender?: string;
  /**	Date	出生日期	O */
  BornTime?: Date;
  /**	Int32	证件类型，参见：2.3.12.1	O */
  @Transform(transformParams)
  CertificateType?: number;
  /**	String	证件号码	O */
  CertificateNumber?: string;
  /**	String	描述备注	O */
  Remark?: string;
  /**	DeployDetails[]	布控报警时间段和阈值	M */
  @Type(() => DeployDetails)
  Details?: DeployDetails[];

  static Create() {
    let params = new CreateFaceDeployControlParams();
    let duration = DateTimeTool.allDay(new Date());
    duration.end.setDate(duration.end.getDate() + 1);
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.BornTime = new Date();
    params.BornTime.setHours(0);
    params.BornTime.setMinutes(0);
    params.BornTime.setSeconds(0);

    params.Details = [
      {
        ThresholdMin: 0.8,
        StartPeriod: new Date(duration.begin.getTime()),
        StopPeriod: new Date(duration.end.getTime()),
      },
    ];
    return params;
  }
}
