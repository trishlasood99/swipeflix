import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserPreferencesService {

  constructor(private http: HttpClient) { }

  getUserPreferences():Observable<any> {
    return this.http.get('assets/dummy-data/user-preferences.data.json');
  }
}