import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DisplayComponent } from './display/display.component';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';

const routes: Routes = [

  // wamnt to protect this route, no unauth users must access tyhis!
  // okta has a router guarad we can use vvv 
 {path: 'login', component: LoginComponent},
 {path: 'login/callback', component: OktaCallbackComponent}, 
 {path: 'display', component: DisplayComponent, canActivate: [OktaAuthGuard]},
 {path: '', redirectTo:'login', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
