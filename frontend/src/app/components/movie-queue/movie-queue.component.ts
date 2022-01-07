import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { MoviesService } from '../../services/movies.service';
import { SwipeService } from '../../services/swipe.service';

@Component({
  selector: 'app-movie-queue',
  templateUrl: './movie-queue.component.html',
  styleUrls: ['./movie-queue.component.css']
})
export class MovieQueueComponent implements OnInit {
  moviesList: Movie[] = [];
  index:number = 0;
  limit:number = 0;
  constructor(private moviesService: MoviesService, private swipeService: SwipeService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    console.log("Getting movies!");
    this.moviesService.getMovies().subscribe(movies => {
      this.moviesList = movies;
      this.index=0;
      this.limit = (10<this.moviesList.length)?10:this.moviesList.length;
    });
  }

  leftSwipe(): void {
    this.index++;
    if (this.index==this.limit) {
      this.getMovies();
    }
  }

  rightSwipe(movieId:string): void {
      this.swipeService.createRightSwipe(movieId);
      this.index++;
      if (this.index==this.limit) {
        this.getMovies();
      }
  }

}
