import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_ENDPOINT = 'http://localhost:4000/api/protected/user/preferences'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserPreferencesService {

  constructor(private http: HttpClient) { }

  getUserPreferences():Observable<any> {
    return this.http.get(API_ENDPOINT);
  }

  postUserPreferences(genres:string[], rating: number) {
    console.log(genres);
    console.log(rating);
  }

  patchUserPreferences(genres:string[], rating: number) {
    return this.http.patch(API_ENDPOINT, {
      genres: genres,
      imdb_rating: rating
    }, httpOptions);
  }
}
