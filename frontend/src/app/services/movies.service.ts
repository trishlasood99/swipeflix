import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_ENDPOINT = 'http://localhost:4000/api/protected/movies';

@Injectable({
  providedIn: 'root'
})

export class MoviesService {

  constructor(private http: HttpClient) { }

  getMovies():Observable<any> {
    return this.http.get('assets/dummy-data/movies.data.json');
  }

  getMovieById(movieId: string):Observable<any> {
    return this.http.get(API_ENDPOINT+'/'+movieId);
  }
}
