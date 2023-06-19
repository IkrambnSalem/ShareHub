import { Component, OnInit } from '@angular/core';
import {FormGroup ,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm:FormGroup;
  path:string;
  constructor(private formBuilder:FormBuilder, private Router:Router,private userService:UsersService) { }

  ngOnInit() {
    this.path=this.Router.url;
    this.signupForm=this.formBuilder.group({
      userName:["",[Validators.required,Validators.minLength(3)]],
      email:["",[Validators.required,Validators.email]],
      password:["",[Validators.required,Validators.minLength(6),Validators.maxLength(12)]],
    })
  }
  signup(){
console.log("here user Object",this.signupForm.value);
this.signupForm.value.role=(this.path == "/signup") ? "user" : (this.path == "/signupAdmin") ? "admin" : "superadmin";
this.userService.signup(this.signupForm.value).subscribe((data)=>{
console.log(data.message);

})
  }

}
