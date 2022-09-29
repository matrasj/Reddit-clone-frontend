import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RegisterRequestModel} from "../model/register-request-model";
import {BehaviorSubject, catchError, map, Observable, of, Subject, tap} from "rxjs";
import {LoginRequestModel} from "../model/login-request-model";
import {B} from "@angular/cdk/keycodes";
import {Router} from "@angular/router";

// @ts-ignore
@Injectable()
export class AuthService {
  private API_REGISTER_URL : string = "http://localhost:8081/api/v1/auth/register"
  private API_LOGIN_URL: string = "http://localhost:8081/api/v1/auth/login";
  private API_REFRESH_TOKEN_URL : string = "http://localhost:8081/api/v1/auth/refresh/token"
  public isAuthenticated : Subject<boolean> = new BehaviorSubject(false);
  public username : Subject<string | any> = new BehaviorSubject('');
  private API_DELETE_TOKEN_URL: string = "http://localhost:8081/api/v1/auth/logout";
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
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('expiresAt', data.expiresAt);
        localStorage.setItem('username', data.username);
        this.isAuthenticated.next(true);
        this.username.next(data.username);
        return true;
      }));
  }

  getJwtToken() {
    return localStorage.getItem('authenticationToken');
  }

  refreshToken() {

    return this.httpClient.post<LoginResponse>(`${this.API_REFRESH_TOKEN_URL}`, {
      username : localStorage.getItem('username'),
      refreshToken : localStorage.getItem('refreshToken')
    }).pipe(tap((res) => {
      localStorage.removeItem('authenticationToken');
      localStorage.removeItem('expiresAt');

      localStorage.setItem('authenticationToken', res.authenticationToken);
      localStorage.setItem('expiresAt', res.expiresAt);
    }));
  }

  logoutUser() {
    this.router.navigateByUrl("/");
    this.httpClient.post(`${this.API_DELETE_TOKEN_URL}`, {
      username : localStorage.getItem('username'),
      refreshToken : localStorage.getItem('refreshToken')
    })

    this.username.next(null);
    this.isAuthenticated.next(false);
    localStorage.removeItem('authenticationToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('username');
  }

  getUsername() {
    return localStorage.getItem('username');
  }
}

interface LoginResponse {
  authenticationToken : string,
  refreshToken : string,
  expiresAt : string,
  username : string
}
