import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/tools/service/local-storage.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.less'],
})
export class AccountInfoComponent implements OnInit {
  desc: string = '结构化管理平台';
  title: string = '';

  constructor(private _localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    let user = this._localStorageService.user;
    if (user.Resources && user.Resources.length > 0) {
      this.title = user.Resources[0].Name ?? '';
    }


  }
}
