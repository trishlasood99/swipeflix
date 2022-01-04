import { Injectable } from '@angular/core';
import { Friend } from '../models/friend.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor(private http: HttpClient) { }

  getFriends():Observable<any> {
    return this.http.get('assets/dummy-data/friends.data.json');
  }
}
