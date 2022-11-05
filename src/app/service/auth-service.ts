import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, map, Observable, of, Subject, tap} from "rxjs";

import {B} from "@angular/cdk/keycodes";
import {Router} from "@angular/router";
import {RegisterRequestModel} from "../model/auth/register-request-model";
import {LoginRequestModel} from "../model/auth/login-request-model";

// @ts-ignore
@Injectable()
export class AuthService {
  private API_REGISTER_URL : string = "http://localhost:8081/api/v1/auth/registration"
  private API_LOGIN_URL: string = "http://localhost:8081/api/v1/auth/login";

  public isAuthenticated : Subject<boolean> = new BehaviorSubject(false);
  public username : Subject<string | any> = new BehaviorSubject('');

  constructor(private httpClient : HttpClient,
              private router : Router) {
    if (localStorage.getItem('username')) {
      this.isAuthenticated.next(true);
      this.username.next(localStorage.getItem('username'));
    }
  }

  signUpUser(registerRequest : RegisterRequestModel) : Observable<any> {
    return this.httpClient.post<any>(`${this.API_REGISTER_URL}`, registerRequest);
  }

  authenticateUser(loginRequest : LoginRequestModel) : Observable<boolean>{
    return this.httpClient.post<LoginResponse>(`${this.API_LOGIN_URL}`, loginRequest)
      .pipe(map((data) => {
        localStorage.setItem('authenticationToken', data.authenticationToken);
        localStorage.setItem('expiresAt', data.expiresAt);
        localStorage.setItem('username', data.username);
        this.isAuthenticated.next(true);
        this.username.next(data.username);

        this.router.navigate(['/']);
        return true;
      }));
  }

  getJwtToken() {
    return localStorage.getItem('authenticationToken');
  }

  logoutUser() {
    this.router.navigateByUrl("/");
    this.username.next(null);
    this.isAuthenticated.next(false);
    localStorage.removeItem('authenticationToken');
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('username');
  }

  getUsername() {
    return localStorage.getItem('username');
  }
}

interface LoginResponse {
  authenticationToken : string,
  expiresAt : string,
  username : string
}
