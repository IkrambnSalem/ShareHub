import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { MinileftbarComponent } from './components/minileftbar/minileftbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { JwtInterceptorService } from './services/jwt-interceptor.service';
import { FormUploadComponent } from './components/form-upload/form-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    MinileftbarComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    FormUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass:JwtInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
