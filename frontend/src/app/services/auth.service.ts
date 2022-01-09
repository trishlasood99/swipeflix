import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:4000/api/auth';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signUp(user: User):Observable<any> {
    return this.http.post(AUTH_API+'/signup',{
      username:user.username,
      email:user.email,
      password:user.password
    }, httpOptions);
  }

  signIn(username: string, password: string):Observable<any> {
    return this.http.post(AUTH_API+'/login',{
      username:username,
      password:password
    },httpOptions);
  }

}
