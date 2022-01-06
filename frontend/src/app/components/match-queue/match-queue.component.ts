import { Component, OnInit } from '@angular/core';
import { MatchesService } from '../../services/matches.service';
import { Match } from '../../models/match.model';
import { Movie } from '../../models/movie.model';
import { FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-match-queue',
  templateUrl: './match-queue.component.html',
  styleUrls: ['./match-queue.component.css']
})
export class MatchQueueComponent implements OnInit {
  matchesList:Match[]=[];
  showMovieDetail:boolean[] = [];
  showDatePicker:boolean[] = [];
  movie: Movie = new Movie("Steven Spielberg",200,"Drama|War","https://www.imdb.com/title/tt0108052/",1993,8.9,"Schindler's List");
  selectedMatchId:string[] = [];
  formDate = new FormArray([]);

  constructor(private matchService: MatchesService) { }

  ngOnInit(): void {
    this.getMatches();
  }

  getMatches():void{
    this.matchService.getMatches().subscribe( (matches) => {
      this.matchesList = matches
      for(let i = 0;i<this.matchesList.length;i++) {
        this.showMovieDetail.push(false);
        this.showDatePicker.push(false);
        this.selectedMatchId.push("");
        this.formDate.push(new FormControl());
      }
    });
  }

  getMovieDetails(movieId: string,index: number) {
    // TODO: call service to get movie by id
    console.log(movieId);
    this.showMovieDetail[index] = (this.showMovieDetail[index])?false:true;
  }

  setDate(matchId:string, index:number) {
    this.selectedMatchId[index] = matchId;
    console.log(this.selectedMatchId[index]);
    this.showDatePicker[index] = (this.showDatePicker[index])?false:true;
  }

  updateDateSet(index:number) {
    // TODO: call service to update set date
    console.log("Date set for "+this.selectedMatchId[index]+" changed to "+this.formDate.at(index).value);
  }

  onRemove(match:Match): void{
    const index = this.matchesList.indexOf(match, 0);
    if (index > -1) {
      this.matchesList.splice(index, 1);
    }
    // TODO: call to service to delete this friendship
  }

  getFormControl(index:number) {
    return this.formDate.at(index) as FormControl;
  }
}
