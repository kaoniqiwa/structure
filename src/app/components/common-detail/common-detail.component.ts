import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IModel } from 'src/app/models/model.interface';
import { CommonDetailBusiness } from './common-detail.business';
import { CommonDetailConverter } from './common-detail.converter';
import { CommonDetailConfig, CommonDetailModel } from './common-detail.model';

@Component({
  selector: 'app-common-detail',
  templateUrl: './common-detail.component.html',
  styleUrls: ['./common-detail.component.less'],
  providers: [CommonDetailBusiness],
})
export class CommonDetailComponent implements OnInit {
  @Input()
  dataSource?: IModel;
  @Input()
  config: CommonDetailConfig = new CommonDetailConfig();

  @Output()
  closeEvent = new EventEmitter<boolean>();
  @Output()
  magnifyEvent = new EventEmitter<string>();
  @Output()
  playback: EventEmitter<IModel> = new EventEmitter();
  @Output()
  deploy: EventEmitter<IModel> = new EventEmitter();

  model!: CommonDetailModel;

  constructor(private _business: CommonDetailBusiness) {}

  ngOnInit() {
    console.log('datasource', this.dataSource);
    if (this.dataSource) {
      this.model = this._business.init(this.dataSource);
      console.log(this.model);
    }
  }

  close() {
    this.closeEvent.emit(false);
  }

  magnify(url: string) {
    this.magnifyEvent.emit(url);
  }
  onplayback() {
    this.playback.emit(this.dataSource);
  }
  ondeploy() {
    this.deploy.emit(this.dataSource);
  }
}
