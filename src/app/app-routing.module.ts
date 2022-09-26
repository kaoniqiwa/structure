import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthorizationService } from './network/request/auth/auth-request.service';
import { RoutePath } from './app-routing.path';
import { IndexComponent } from './views/index/index.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: RoutePath.login,
    pathMatch: 'full',
  },
  {
    path: RoutePath.login,
    component: LoginComponent,
  },
  {
    path: RoutePath.index,
    component: IndexComponent,
    canActivate: [AuthorizationService],
  },
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
