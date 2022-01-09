import { Component, OnInit } from '@angular/core';
import { MatchesService } from '../../services/matches.service';
import { Match } from '../../models/match.model';
import { Movie } from '../../models/movie.model';
import { FormControl, FormArray } from '@angular/forms';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-match-queue',
  templateUrl: './match-queue.component.html',
  styleUrls: ['./match-queue.component.css']
})
export class MatchQueueComponent implements OnInit {
  matchesList:Match[]=[];
  showMovieDetail:boolean[] = [];
  showDatePicker:boolean[] = [];
  movie: Movie[] = [];
  selectedMatchId:string[] = [];
  formDate = new FormArray([]);

  constructor(private matchService: MatchesService, private movieService: MoviesService) { }

  ngOnInit(): void {
    this.getMatches();
  }

  getMatches():void{
    this.matchService.getMatches().subscribe( (matches) => {
      //console.log(matches);
      this.matchesList = matches
      console.log(this.matchesList);
      for(let i = 0;i<this.matchesList.length;i++) {
        this.showMovieDetail.push(false);
        this.showDatePicker.push(false);
        this.selectedMatchId.push("");
        this.formDate.push(new FormControl());
        this.movie.push(new Movie("","",0,"","",0,0,""));
      }
    });
  }

  getMovieDetails(movieId: string,index: number) {
    // TODO: call service to get movie by id
    //console.log(movieId);
    this.movieService.getMovieById(movieId).subscribe(movie => {
      this.movie[index]=movie;
      this.showMovieDetail[index] = (this.showMovieDetail[index])?false:true;
    })

  }

  setDate(matchId:string, index:number) {
    this.selectedMatchId[index] = matchId;
    console.log(this.selectedMatchId[index]);
    this.showDatePicker[index] = (this.showDatePicker[index])?false:true;
  }

  updateDateSet(index:number) {
    this.matchService.setMatchDate(this.selectedMatchId[index],this.getFormControl(index).value).subscribe((match) => {
      this.matchesList[index]=match;
      //console.log("Date set for "+this.selectedMatchId[index]+" changed to "+this.formDate.at(index).value);
    });
  }

  onRemove(match:Match): void{
    this.matchService.deleteMatch(match._id).subscribe(() => {
      const index = this.matchesList.indexOf(match, 0);
      if (index > -1) {
        this.matchesList.splice(index, 1);
      }
    })
  }

  getFormControl(index:number) {
    return this.formDate.at(index) as FormControl;
  }
}
