import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LocalStorageService } from 'src/app/tools/service/local-storage.service';
import { SessionStorageService } from 'src/app/tools/service/session-storage.service';
import { AccountOperationDisplay } from './account-operation.model';

@Component({
  selector: 'app-account-operation',
  templateUrl: './account-operation.component.html',
  styleUrls: ['./account-operation.component.less'],
})
export class AccountOperationComponent implements OnInit {
  @Output()
  changePassword: EventEmitter<void> = new EventEmitter();
  @Output()
  bindMobile: EventEmitter<void> = new EventEmitter();

  constructor(
    private _sessionStorageService: SessionStorageService,
    private _localStorageService: LocalStorageService,
    private _store: LocalStorageService,
    private _cookieService: CookieService,
    private _router: Router
  ) { }

  userName: string = '';
  display = new AccountOperationDisplay();

  ngOnInit(): void {
    let userName = this._cookieService.get('userName');
    userName = atob(userName);

    let res = userName.match(
      /[a-zA-Z0-9+/=]{32}(?<userName>\w*)[a-zA-Z0-9+/=]{32}/
    )!;

    userName = res.groups!['userName'];

    this.userName = userName;

  }
  logoutHandler() {
    this._sessionStorageService.clear();
    this._localStorageService.clear();

    this._router.navigateByUrl('/login');

    // if (this._cookieService.check('savePassWord')) {
    //   let savePassWord = JSON.parse(this._cookieService.get('savePassWord'));
    //   if (!savePassWord) {
    //     this._cookieService.deleteAll('/');
    //   }
    // }
  }
  navigateToHelp() {
    window.open('http://garbage01.51hws.com/help/help.html');
  }
  onpasswordchang(event: Event) {
    this.changePassword.emit();
  }
  onmobilebind(event: Event) {
    this.bindMobile.emit();
  }
}
