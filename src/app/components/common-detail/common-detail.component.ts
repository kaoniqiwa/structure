import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IModel } from 'src/app/models/model.interface';
import { CommonDetailBusiness } from './common-detail.business';
import { CommonDetailConverter } from './common-detail.converter';
import { CommonDetailModel } from './common-detail.model';

@Component({
  selector: 'app-common-detail',
  templateUrl: './common-detail.component.html',
  styleUrls: ['./common-detail.component.less'],
  providers: [CommonDetailBusiness],
})
export class CommonDetailComponent implements OnInit {
  @Input() dataSource?: IModel;

  @Output() closeEvent = new EventEmitter<boolean>();
  @Output() magnifyEvent = new EventEmitter<string>();

  model?: CommonDetailModel;

  constructor(private _business: CommonDetailBusiness) {}

  async ngOnInit() {
    console.log('datasource', this.dataSource);
    if (this.dataSource) {
      this.model = await this._business.init(this.dataSource);
      console.log(this.model);
    }
  }

  close() {
    this.closeEvent.emit(false);
  }

  magnify(url: string) {
    this.magnifyEvent.emit(url);
  }
}
