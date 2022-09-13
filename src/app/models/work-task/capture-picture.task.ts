import { CaptureQuality } from 'src/app/enums/capture-quality.enum';
import { CaptureType } from 'src/app/enums/capture-type.enum';
import { IModel } from '../model.interface';
import { WorkTask } from './work.task';

/** CapturePictureTask (定时抓图任务)	*/
export class CapturePictureTask extends WorkTask implements IModel {
  /**	Int32	抓图间隔，单位：秒	M	*/
  Interval!: number;
  /**	Int32	"抓图模式：
1:时间点抓图
2:时间段抓图"	M	*/
  CaptureType!: CaptureType;
  /**	Int32	"图片质量
1：高
2：中
3：低"	M	*/
  Quality!: CaptureQuality;
}
