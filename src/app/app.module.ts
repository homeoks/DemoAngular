import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginModule } from './login/login.module';
import { RegisterComponent } from './register/register.component';
import { httpInterceptorProviders } from './helper';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NewFeedComponent } from './new-feed/new-feed.component';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    NewFeedComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    LoginModule,
    HttpClientModule,
    FormsModule,
    MatTooltipModule
  ],
  exports:[BrowserAnimationsModule,MatTooltipModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
