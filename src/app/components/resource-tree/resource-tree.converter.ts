import { Injectable } from '@angular/core';
import { Camera } from 'src/app/models/resource/camera.resource';
import { Language } from 'src/app/tools/language';
import { CommonNestNode } from '../common-tree/common-nest-node.model';
import { CommonTreeConverter } from '../common-tree/common-tree.converter';

export type ResourceList = Camera;

@Injectable({
  providedIn: 'root',
})
export class CameraTreeConverter extends CommonTreeConverter {
  Convert(source: ResourceList, ...res: any[]): CommonNestNode {
    if (source instanceof Camera) {
      return this._fromCamera(source);
    }
    throw new Error('Method not implemented.');
  }

  private _fromCamera(item: Camera): CommonNestNode<Camera> {
    const node = new CommonNestNode();
    node.Id = item.Id;
    node.Name = item.Name;
    node.HasChildren = false;
    node.ParentId = undefined;
    node.ChildrenLoaded = true;
    node.ParentNode = null;
    node.IconClass = Language.CameraIcon(item.CameraType);
    node.RawData = item;
    node.hideArrow = true;
    return node;
  }
}
