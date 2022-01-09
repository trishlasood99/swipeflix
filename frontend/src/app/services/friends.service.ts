import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_ENDPOINT = 'http://localhost:4000/api/protected/user/friends';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor(private http: HttpClient) { }

  getFriends():Observable<any> {
    return this.http.get(API_ENDPOINT);
  }

  addFriend(username:string):Observable<any> {
    return this.http.post(API_ENDPOINT,{ friend: username }, httpOptions);
  }

  removeFriend(_id:string):Observable<any> {
    return this.http.delete(API_ENDPOINT+'/'+_id);
  }

}
