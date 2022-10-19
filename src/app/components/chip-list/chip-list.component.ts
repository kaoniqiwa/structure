import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IChipListItem } from './chip-list.model';

@Component({
  selector: 'howell-chip-list',
  templateUrl: './chip-list.component.html',
  styleUrls: ['./chip-list.component.less'],
})
export class ChipListComponent<T extends IChipListItem> implements OnInit {
  @Input()
  datas: T[] = [];
  @Output()
  click: EventEmitter<Event> = new EventEmitter();
  @Output()
  select: EventEmitter<T> = new EventEmitter();

  constructor() {}

  selected?: T;

  ngOnInit(): void {}

  onclick(e: Event) {
    this.click.emit(e);
  }
  onremove(item: T) {
    if (this.datas) {
      const index = this.datas.indexOf(item);
      if (index >= 0) {
        this.datas.splice(index, 1);
      }
    }
  }
  onselect(e: Event, item: T) {
    this.selected = item;
    this.select.emit(this.selected);
    e.stopPropagation();
  }
}
