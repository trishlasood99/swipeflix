import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ErrorService } from '../services/error.service';

//HttpInterceptor is an interface that allows us to implement the intercept function

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private errorService: ErrorService) { }

  /*
   The intercept function identifies and handles a given HTTP request.
   req: outgoing request object to handle
   next: the next interceptor in the chain or the backend if no other interceptor exists
  */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status == 401 || err.status == 403 || err.status == 404 || err.status == 500) {
          let data = err.error.message;
          this.errorService.openDialogBox(data);
          return throwError(err);
        } else {
          return throwError(err);
        }
      })
    );
  }
}

export const errorInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
];
