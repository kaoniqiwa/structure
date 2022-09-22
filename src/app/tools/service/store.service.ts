import { EventEmitter, Injectable } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  regionId!: string;
  constructor() {}

  interval = new EventEmitter();
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
}
