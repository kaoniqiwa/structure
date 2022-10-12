import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'name_pipe', pure: false })
export class NamePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(obj: IName | null) {
    if (obj) return obj.Name;
    return '';
  }
}

interface IName {
  Name: string;
}
