import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;


  constructor(private userService: UsersService,private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.loginForm=this.formBuilder.group({
      userName:["",[Validators.required, Validators.minLength(3)]],
      password:["",[Validators.required,Validators.minLength(6),Validators.maxLength(12)]]
    })
    
  }
  login(){
    console.log(this.loginForm.value);
   this.userService.login(this.loginForm.value);

  }
}
