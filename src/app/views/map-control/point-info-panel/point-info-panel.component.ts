import { DatePipe } from '@angular/common';
import { Output, EventEmitter } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { OnlineStatus } from 'src/app/enums/online-status.enum';
import { RegionNode } from 'src/app/models/region-node.model';
import { Language } from 'src/app/tools/language';

@Component({
  selector: 'app-point-info-panel',
  templateUrl: './point-info-panel.component.html',
  styleUrls: ['./point-info-panel.component.css'],
})
export class PointInfoPanelComponent implements OnInit {
  visibility: boolean = false;

  committeeName: string = ''; // 居委会名称
  roadName: string = ''; // 街道名称

  @Input()
  node?: RegionNode;

  @Input()
  VisibilityChange = (val: boolean) => {
    this.visibility = val;
  };

  /**
   *  状态点击事件
   *
   * @type {EventEmitter<RegionNode>}
   * @memberof PointInfoPanelComponent
   */
  @Output()
  StateClickedEvent: EventEmitter<RegionNode> = new EventEmitter();

  constructor(private datePipe: DatePipe) {
    // this.RegionNode.Members
  }
  OnlineStatus = OnlineStatus;
  Language = Language;
  ngOnInit() {}

  state = {
    language: '',
    className: 'normal',
  };
}
