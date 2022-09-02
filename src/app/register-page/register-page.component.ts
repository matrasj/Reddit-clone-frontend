import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RegisterRequestModel} from "../model/register-request-model";
import {AuthService} from "../service/auth-service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  registerFormGroup : FormGroup | any;


  constructor(private formBuilder : FormBuilder,
              private authService : AuthService,
              private toast : ToastrService) { }

  ngOnInit(): void {
    this.registerFormGroup = this.formBuilder.group({
      account : this.formBuilder.group({
        email : new FormControl('', [Validators.required, Validators.pattern(`^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$`)]),
        username : new FormControl('', [Validators.required, Validators.minLength(4)]),
        password : new FormControl('', [Validators.required, Validators.minLength(4)])
      })
    });
  }

  onSigningUp() {
    if (this.registerFormGroup.invalid) {
      this.registerFormGroup.markAllAsTouched();
    } else {
      const registerRequest : RegisterRequestModel = new RegisterRequestModel(
        this.email.value,
        this.username.value,
        this.password.value
      );

      this.authService.signUpUser(registerRequest)
        .subscribe((res) => {
          this.toast.success("Check your email to confirm account", "Success!")
        }, error => {
          this.toast.error("Error", "Something gone wrong");
          this.registerFormGroup.reset();
        });
    }
  }

  get username() {
    return this.registerFormGroup.get('account').get('username');
  }

  get password() {
    return this.registerFormGroup.get('account').get('password');
  }

  get email() {
    return this.registerFormGroup.get('account').get('email');
  }

}
