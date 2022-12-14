import { Transform } from 'class-transformer';
import { TimeUnit } from '../enums/time-unit.enum';
import { Duration } from '../models/duration.model';
import {
  transformDateTime,
  transformImageData,
} from '../models/transform.model';

export interface IParams {}
export class PagedParams implements IParams {
  /**页码[1-n](可选) */
  PageIndex?: number = 1;
  /**分页大小[1-100](可选) */
  PageSize?: number = 9999;
}
export class DurationParams {
  /**	DateTime	开始时间	M */
  @Transform(transformDateTime)
  BeginTime!: Date;
  /**	DateTime	结束时间	M */
  @Transform(transformDateTime)
  EndTime!: Date;

  static from(duration: Duration) {
    let params = new DurationParams();
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    return params;
  }

  static TimeUnit(unit: TimeUnit, date: Date, firstDay = 1) {
    switch (unit) {
      case TimeUnit.Month:
        return DurationParams.allMonth(date);
      case TimeUnit.Week:
        return DurationParams.allWeek(date, firstDay);
      case TimeUnit.Hour:
      case TimeUnit.Day:
      default:
        return DurationParams.allDay(date);
    }
  }

  static allMonth(date: Date) {
    let params = new DurationParams();
    params.BeginTime = new Date(date.getFullYear(), date.getMonth(), 1);
    let next = new Date(params.BeginTime.getTime());
    next.setMonth(next.getMonth() + 1);
    next.setMilliseconds(-1);
    params.EndTime = next;
    return params;
  }
  static allDay(date: Date) {
    let params = new DurationParams();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    params.BeginTime = new Date(year, month, day);
    let next = new Date(params.BeginTime.getTime());
    next.setDate(next.getDate() + 1);
    next.setMilliseconds(-1);
    params.EndTime = next;
    return params;
  }
  static allWeek(date: Date, firstDay = 0) {
    let params = new DurationParams();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let weekDay = date.getDay() - firstDay;

    let begin = new Date(year, month, day);
    begin.setDate(begin.getDate() - weekDay);
    begin.toISOString;
    params.BeginTime = begin;
    let next = new Date(begin.getTime());
    next.setDate(next.getDate() + 7);
    next.setMilliseconds(-1);
    params.EndTime = next;
    return params;
  }

  static beforeAndAfter(date: Date, seconds: number = 30) {
    let params = new DurationParams();

    let begin = new Date(date.getTime());
    begin.setSeconds(begin.getSeconds() - seconds);
    params.BeginTime = new Date(begin.getTime());

    let end = new Date(date.getTime());
    end.setSeconds(end.getSeconds() + seconds);
    params.EndTime = end;

    return params;
  }

  static before(date: Date, day: number = 7) {
    let end = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    end.setMilliseconds(-1);
    let params = new DurationParams();
    params.EndTime = end;
    let begin = new Date(date.getTime());
    begin.setHours(0);
    begin.setMinutes(0);
    begin.setSeconds(0);
    begin.setMilliseconds(0);
    begin.setDate(date.getDate() - day);
    params.BeginTime = begin;

    return params;
  }
}
export class PagedDurationParams extends PagedParams {
  /**	DateTime	开始时间	M */
  @Transform(transformDateTime)
  BeginTime!: Date;
  /**	DateTime	结束时间	M */
  @Transform(transformDateTime)
  EndTime!: Date;
}
export class ImageParams {
  /**	String	图片数据通过Base64编码后的字符串（图片像素在256*256-900w内，文件大小在128字节-4M内。图片类型限制为：png、jpg/jpeg、bmp）	M */
  @Transform(transformImageData)
  ImageData!: string;
}
