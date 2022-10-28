import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RegionNode } from 'src/app/models/region-node.model';

@Pipe({ name: 'default_id_array_pipe', pure: false })
export class DefaultIdArrayPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(nodes: IId[]) {
    return nodes.map((x) => x.Id);
  }
}

interface IId {
  Id: string;
}
