import { EventEmitter, Injectable } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { ConfigRequestService } from 'src/app/network/request/config/config-request.service';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  async getRegionId() {
    let config = await this.config.getConfig();
    return config.regionId;
  }

  constructor(private config: ConfigRequestService) {}

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
    this.interval.unsubscribe();
    this.interval = new EventEmitter();

    this.refresh.unsubscribe();
    this.refresh = new EventEmitter();
  }
}
