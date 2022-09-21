import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'percentage', pure: false })
export class PercentagePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: number) {
    return Math.round(value * 100);
  }
}
