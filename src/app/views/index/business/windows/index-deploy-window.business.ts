import { EventEmitter } from '@angular/core';
import { IndexDeployFaceDetailsWindow } from './index-deploy-face-details.business';
import { IndexDeployVehicleDetailsWindow } from './index-deploy-vehicle-details.business';
import { IndexWindowBusiness } from './index-window.business';

export class IndexDeployWindow {
  constructor(window: IndexWindowBusiness) {
    this.face = new IndexDeployFaceDetailsWindow(window);
    this.vehicle = new IndexDeployVehicleDetailsWindow(window);
  }

  load: EventEmitter<void> = new EventEmitter();

  face: IndexDeployFaceDetailsWindow;
  vehicle: IndexDeployVehicleDetailsWindow;
}
