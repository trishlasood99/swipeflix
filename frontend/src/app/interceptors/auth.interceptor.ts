import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { TokenStorageService } from '../services/token-storage.service';

const TOKEN_HEADER_KEY = 'x-access-tokens';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;
    // fetches the JWT token using the TokenStorageService if it is present in local storage
    const token = this.token.getToken();
    if (token != null) {

      /*
      The object in the brackets is an HttpHeaders object containing all the headers of the
      req object as well as a the x-access-tokens header with the value of the fetched JWT token
      req.clone() returns a clone of the request with all the headers as passed in the object in the
      parameter list
      */
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, token) });
    }
    // request is passed to the next interceptor in the chain
    return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
