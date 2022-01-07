import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwipeService {

  constructor(private http: HttpClient) { }

  createRightSwipe(movieId: string): void {
    console.log("User rightswiped on "+movieId);
  }
}
