import { Component, OnInit } from '@angular/core';
import { RealTimeBusiness } from './realtime.business';

@Component({
  selector: 'app-realtime',
  templateUrl: './realtime.component.html',
  styleUrls: ['./realtime.component.less'],
  providers: [RealTimeBusiness],
})
export class RealtimeComponent implements OnInit {
  constructor(private _business: RealTimeBusiness) {}

  ngOnInit(): void {}
}
