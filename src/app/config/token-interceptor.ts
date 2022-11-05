import {Injectable} from "@angular/core";
import {AuthService} from "../service/auth-service";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";

import {Router} from "@angular/router";
import {catchError, Observable, throwError} from "rxjs";


@Injectable()
export class TokenInterceptor implements HttpInterceptor{
  constructor(private authService : AuthService,
              private router : Router) {
  }

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes("api/v1/auth")) {
      return next.handle(req);
    }

    const jwtToken = this.authService.getJwtToken();
    const requestWithJwtToken = jwtToken ? TokenInterceptor.addToken(req, jwtToken) : req;

    return next.handle(requestWithJwtToken).pipe(
      catchError(
        err => {
          if (err.status === 401 || err.status === 403) {
            this.router.navigate(['/login']);
          }

          return throwError("Something went wrong");
        }
      )
    )
  }


  private static addToken(req : HttpRequest<any>, jwtToken : any) {
    return req.clone({
      setHeaders : {
        Authorization : `Bearer ${jwtToken}`
      }
    })
  }
}


