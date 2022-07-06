import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WebcamModule } from 'ngx-webcam';
import { NgxSpinnerModule } from "ngx-spinner";

import { AppComponent } from './app.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { PassDirective } from './login/pass.directive';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { AdminComponent } from './pages/admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PassDirective,
    UsuarioComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    WebcamModule,
    NgxSpinnerModule
  ],
  providers: [{ useClass: HashLocationStrategy, provide: LocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
