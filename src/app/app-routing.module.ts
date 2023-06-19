import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { FormUploadComponent } from './components/form-upload/form-upload.component';


const routes: Routes = [
  { path: 'signup', component:SignupComponent },
  { path: 'signupAdmin', component:SignupComponent },
  { path: 'signupSuperAdmin', component:SignupComponent },
  { path: 'loginnn', component:LoginComponent },
  { path: '', component:HomeComponent },
  { path: 'form-upload', component:FormUploadComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
