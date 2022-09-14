import { formatDate } from '@angular/common';
import { CameraUsage } from '../enums/camera-usage.enum';
import { EventType } from '../enums/event-type.enum';

export class Language {
  static Week(day: number, format: string = '周') {
    let name = ['日', '一', '二', '三', '四', '五', '六', '日'];
    return `${format}${name[day]}`;
  }

  static DateTime(date: Date, format: string) {
    return formatDate(date, format, 'en');
  }




}
