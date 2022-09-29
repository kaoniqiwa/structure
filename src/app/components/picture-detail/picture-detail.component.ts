import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventRecord } from 'src/app/models/event-record/event.record';
import { StructuredDataBodyQueryModel } from 'src/app/views/structured-data/structured-data-body-query/structured-data-body-query.model';

@Component({
  selector: 'app-picture-detail',
  templateUrl: './picture-detail.component.html',
  styleUrls: ['./picture-detail.component.less'],
})
export class PictureDetailComponent implements OnInit {
  @Input()
  models?: StructuredDataBodyQueryModel[];
  @Input()
  image?: string;

  @Output() closeEvent = new EventEmitter<boolean>();
  constructor() {}

  selected!: StructuredDataBodyQueryModel;

  ngOnInit(): void {
    if (this.models && this.models.length > 0) {
      this.selected = this.models[0];
    }
  }
  close() {
    this.closeEvent.emit(false);
  }
}
