import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse, HttpEvent, HttpHandler,HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

//HttpInterceptor is an interface that allows us to implement the intercept function

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  /*
   The intercept function identifies and handles a given HTTP request.
   req: outgoing request object to handle
   next: the next interceptor in the chain or the backend if no other interceptor exists
  */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status == 401 || err.status == 403) {
          this.router.navigate(['/login']);
        }
        else if(err.status == 400 || err.status==500)
        {
          this.router.navigate(['/resultsnotfound/'+err.status]);
        }
        else {
          return throwError(err);
        }
      })
    );
  }
}

export const errorInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
];
