import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_ENDPOINT = 'http://localhost:4000/api/protected/user/matches';
const httpOptions = { headers: new HttpHeaders({ 'Content-Type':'application/json'}) };

@Injectable({
  providedIn: 'root'
})
export class MatchesService {

  constructor(private http: HttpClient) { }

  getMatches():Observable<any> {
    return this.http.get(API_ENDPOINT);
  }

  deleteMatch(_id: string):Observable<any> {
    return this.http.delete(API_ENDPOINT+'/'+_id);
  }

  setMatchDate(_id: string, date: Date): Observable<any> {
    return this.http.patch(API_ENDPOINT+'/'+_id,{ date: date }, httpOptions);
  }
}
