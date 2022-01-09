import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  // removes the JWT token from local storage, therefore it cannot be added in the
  // x-access-tokens header and user has to log in again to get a fresh token
  signOut() {
    window.sessionStorage.clear();
  }

  // removes the last JWT token and adds the latest
  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string|null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

}
