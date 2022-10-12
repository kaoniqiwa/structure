import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { OnlineStatus } from '../enums/online-status.enum';
import { ResourceType } from '../enums/resource-type.enum';
import { Language } from '../tools/language';

@Pipe({ name: 'resource_type_pipe', pure: false })
export class ResourceTypePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(type: ResourceType) {
    return Language.ResourceType(type);
  }
}
