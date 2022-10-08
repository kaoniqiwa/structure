export class StructuredDataItemModel<T = any> {
  constructor() {
    for (let i = 0; i < 4; i++) {
      this.datas.push(new StructuredDataItemIconModel());
    }
  }
  images: string[] = [];
  datas: StructuredDataItemIconModel[] = [];
  data?: T;
}

export class StructuredDataItemIconModel {
  icon: string = '';
  name: string = '';
}

export class StructuredDataItemImageArgs {
  model?: StructuredDataItemModel;
  index?: number;
}
