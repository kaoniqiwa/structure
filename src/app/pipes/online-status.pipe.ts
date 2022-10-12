import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { OnlineStatus } from '../enums/online-status.enum';
import { Language } from '../tools/language';

@Pipe({ name: 'online_status_pipe', pure: false })
export class OnlineStatusPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(status: OnlineStatus) {
    return Language.OnlineStatus(status);
  }
}
