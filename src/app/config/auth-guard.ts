import {CanActivate, Route, Router} from "@angular/router";
import {AuthService} from "../service/auth-service";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService : AuthService,
              private router : Router) {
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
      return false;
    }

  }

}
