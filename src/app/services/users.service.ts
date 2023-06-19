import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  userUrl: string = "http://localhost:3000/allUsers";
  public token: string;
  private name: string;
  private authStatusListener = new Subject<boolean>();
  private isUserAuthenticated = false;
  constructor(private httpClient: HttpClient , private router:Router) { }
  getToken() {
    return this.token;
  }
  getName() {
    return this.name;
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  isUserAuth() {
    return this.isUserAuthenticated;
  }
  signup(obj) {
    console.log("objserv", obj);

    return this.httpClient.post<{ message: string }>(this.userUrl, obj);
  }

  login(obj) {
    this.httpClient.post<{ user: any, message: string }>(this.userUrl + "/login", obj).subscribe((res) => {
      console.log("here response", res);
     let connectedUser=res.user;
      const token = res.user.jwt;
      this.token = token;
      if (res.user) {
        this.isUserAuthenticated = true;
        this.name = res.user.userName;
        this.authStatusListener.next(true);
        localStorage.setItem('token', token);
        localStorage.setItem('name', this.name);
        localStorage.setItem('connectedUser',JSON.stringify(connectedUser));
        this.router.navigate(['/']);
      }
    })
  }
}
