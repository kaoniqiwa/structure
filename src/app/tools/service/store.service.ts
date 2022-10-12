import { EventEmitter, Injectable } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import config from 'src/assets/configs/config.json';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private _regionId?: string;
  public get regionId(): string {
    if (!this._regionId) {
      this._regionId = config.regionId;
    }
    return this._regionId;
  }
  public set regionId(v: string) {
    this._regionId = v;
  }

  constructor() {}

  interval = new EventEmitter();
  refresh = new EventEmitter();
  private subscription?: Subscription;
  runInterval() {
    this.subscription = interval(1000 * 60).subscribe(() => {
      this.interval.emit();
    });
  }
  stopInterval() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  clear() {
    this.stopInterval();
    this._regionId = '';
    this.interval.unsubscribe();
    this.interval = new EventEmitter();

    this.refresh.unsubscribe();
    this.refresh = new EventEmitter();
  }
}
