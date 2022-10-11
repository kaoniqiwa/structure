import { Directive, EventEmitter, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { WindowViewModel } from 'src/app/components/window-control/window.model';
import { PictureArgs } from 'src/app/models/args/picture.args';
import { Page } from 'src/app/models/page-list.model';
import { StructuredDataItemImageArgs } from './structured-data-item/structured-data-item.model';

@Directive()
export abstract class StructuredDataAbstractComponent<TModel> {
  @Output()
  image: EventEmitter<PictureArgs> = new EventEmitter();
  page?: Page;
  datas: TModel[] = [];
  selected?: TModel;
  window = {
    details: new WindowViewModel(),
    deploy: new WindowViewModel(),
  };
  async onImageClicked(item: StructuredDataItemImageArgs) {
    if (item.model && item.index != undefined) {
      let args = new PictureArgs();
      args.url = await item.model.images[item.index];
      if (item.model.data) {
        args.id = item.model.data.Id;
        args.title = item.model.data.ResourceName ?? '';
      }
      this.image.emit(args);
    }
  }

  abstract loadData(index: number): Promise<void>;

  pageEvent(page: PageEvent) {
    if (!this.page) {
      this.page = new Page();
    }
    this.page.PageIndex = page.pageIndex + 1;
    this.loadData(this.page.PageIndex);
  }
  onselected(item: TModel) {
    this.selected = item;
    this.window.details.show = true;
  }
  onclosewindow() {
    this.window.details.show = false;
  }

  ondeploy(item: any) {
    this.window.deploy.show = true;
  }
}
