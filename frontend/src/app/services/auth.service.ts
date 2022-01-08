import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  signUp(user: User) {
    console.log(user);
  }

  signIn(username: string, password: string) {
    console.log(`${username}  ${password}`);
  }
}
