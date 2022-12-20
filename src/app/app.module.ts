
import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent} from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCommonModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AddDialog, NavComponent } from './nav/nav.component';
import { DisplayComponent } from './display/display.component';
import { DeleteDialog } from './display/display.component';
import { EditDialog } from './display/display.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'


import {
  OKTA_CONFIG,
  OktaAuthModule
} from '@okta/okta-angular';
import { Router } from '@angular/router';
import myAppConfig from './config/my-app-config';
import { OktaAuth } from '@okta/okta-auth-js';

function onAuthRequired(oktaAuth: OktaAuth, injector: Injector) {
  // Use injector to access any service available within your application

  
  const router = injector.get(Router);

  // Redirect the user to your custom login page
  router.navigate(['/login']);
}

const oktaAuth = new OktaAuth(myAppConfig.oidc);


@NgModule({
  declarations: [
    AppComponent,
    DeleteDialog,
    AddDialog,
    NavComponent,
    DisplayComponent,
    EditDialog,
    LoginComponent,
    
    

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatCommonModule,
    MatCardModule,
    MatDialogModule,
    MatGridListModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    OktaAuthModule, 



  ],
  providers: [
    {
      provide: OKTA_CONFIG,
      useValue: {
        oktaAuth,
        onAuthRequired
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
