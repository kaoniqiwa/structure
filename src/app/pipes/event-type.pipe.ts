import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { EventType } from '../enums/event-type.enum';
import { Language } from '../tools/language';

@Pipe({ name: 'event_type_pipe', pure: false })
export class EventTypePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: EventType) {
    return Language.EventType(value);
  }
}
