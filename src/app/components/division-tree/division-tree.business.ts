import { Injectable } from "@angular/core";
import { CommonNestNode } from "../common-tree/common-nest-node.model";

@Injectable()
export class DivisionTreeBusiness {

  public showStation = false;
  public depthIsEnd = false;

  public nestedNodeMap = new Map<string, CommonNestNode<any>>();


  constructor() { }

  // 相当于默认请求 condition==''的区划


}