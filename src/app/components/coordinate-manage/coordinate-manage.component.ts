import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DialogEnum } from 'src/app/enums/dialog.enum';
import { ICoordinate } from 'src/app/interfaces/coordinate.interface';
import { IDialogMessage } from 'src/app/interfaces/dialog-message.interface';
import { ValidLatitude, ValidLogitude } from 'src/app/tools/tools';

@Component({
  selector: 'coordinate-manage',
  templateUrl: './coordinate-manage.component.html',
  styleUrls: ['./coordinate-manage.component.less'],
})
export class CoordinateManageComponent implements OnInit {
  lon = '';
  lat = '';

  @Input() title = '';

  @Output() closeEvent = new EventEmitter<IDialogMessage<ICoordinate | null>>();

  constructor(private _toastrService: ToastrService) {}

  ngOnInit(): void {}

  onSubmit() {
    // this.closeEvent.emit(
    //   {
    //     type: DialogEnum.confirm,
    //     data: {
    //       lon: 121.482972,
    //       lat: 31.278655
    //     }
    //   }
    // );
    if (this._checkForm()) {
      console.log('输入正确');

      this.closeEvent.emit({
        type: DialogEnum.confirm,
        data: {
          lon: +this.lon,
          lat: +this.lat,
        },
      });
    }
  }
  onReset() {
    this.closeEvent.emit({
      type: DialogEnum.cancel,
      data: null,
    });
  }
  down(e: KeyboardEvent) {
    let key = e.key.toLocaleLowerCase();
    console.log(key);
    if (key === 'e') {
      e.preventDefault();
    }
  }
  private _checkForm() {
    if (!ValidLogitude.test(this.lon)) {
      this._toastrService.error('请输入正确的经度');
      return false;
    }
    if (!ValidLatitude.test(this.lat)) {
      this._toastrService.error('请输入正确的纬度');
      return false;
    }
    return true;
  }
}
