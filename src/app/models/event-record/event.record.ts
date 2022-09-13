import { EventType } from '@angular/router';
import { Transform } from 'class-transformer';
import { ResourceType } from '../../enums/resource-type.enum';
import { IModel } from '../model.interface';
import { transformDateTime } from '../transform.model';

/** EventRecord (事件基础类型)	*/
export class EventRecord implements IModel {
  /**	String	事件ID	M	*/
  Id!: string;
  /**	DateTime	事件时间	M	*/
  @Transform(transformDateTime)
  EventTime!: Date;
  /**	Int32	事件类型	M	*/
  EventType!: EventType;
  /**	String	事件描述信息	O	*/
  EventDescription?: string;
  /**	String	资源ID	O	*/
  ResourceId?: string;

  /**
   *	String	资源类型：	O
   *  Camera：监控点
   *  EncodeDevice：编码设备
   *  IoTSensor：物联网传感器
   */
  ResourceType?: ResourceType;
  /**	String	资源名称	O	*/
  ResourceName?: string;
  /**	String	图片ID、图片地址	O	*/
  ImageUrl?: string;
  /**	String	录像文件ID、录像地址	O	*/
  RecordUrl?: string;
  /**	String[]	事件关键字	O	*/
  EventIndexes?: string[];
}
