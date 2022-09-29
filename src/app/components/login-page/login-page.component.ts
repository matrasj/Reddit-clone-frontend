import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {NgToastService} from "ng-angular-popup";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../service/auth-service";
import {LoginRequestModel} from "../../model/login-request-model";
import {Router} from "@angular/router";
import {catchError, of, pipe} from "rxjs";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginFormGroup : FormGroup | any;
  constructor(private formBuilder : FormBuilder,
              private httpClient : HttpClient,
              private toast : ToastrService,
              private authService : AuthService,
              private router : Router) { }

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      login : this.formBuilder.group({
        username : new FormControl('', [Validators.required, Validators.minLength(4)]),
        password : new FormControl('', [Validators.required, Validators.minLength(4)])
      })
    });
  }

  get username() {
    return this.loginFormGroup.get('login').get('username');
  }

  get password() {
    return this.loginFormGroup.get('login').get('password');
  }

  onLogging() {
    if (this.loginFormGroup.invalid) {
      this.loginFormGroup.markAllAsTouched();
    } else {
      const loginRequest : LoginRequestModel = new LoginRequestModel(
        this.username.value,
        this.password.value
      );

      this.authService.authenticateUser(loginRequest)
          .subscribe(((res) => {
            this.toast.success("Login success!")
            this.router.navigateByUrl("/");
          }), error => {
            this.toast.error("Wrong data", "Error");
          });
    }
  }

}
