import {CanActivate, Route, Router} from "@angular/router";
import {AuthService} from "../service/auth-service";
import {Injectable} from "@angular/core";
import {ToastrService} from "ngx-toastr";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService : AuthService,
              private router : Router,
              private toast : ToastrService) {
  }

  canActivate() {
    let canActivate : boolean = false;
    this.authService.isAuthenticated
      .subscribe((isAuth) => {
        canActivate = isAuth;
      });

    if (canActivate) {
      return true;
    } else {
      this.router.navigate(['/login']);
      this.toast.info("Only for logged users")
      return false;
    }

  }

}
