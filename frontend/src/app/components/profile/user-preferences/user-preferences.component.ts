import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { UserPreference } from '../../../models/user-preference.model';
import { UserPreferencesService } from '../../../services/user-preferences.service';
import { genres } from '../../../../assets/genres';

@Component({
  selector: 'app-user-preferences',
  templateUrl: './user-preferences.component.html',
  styleUrls: ['./user-preferences.component.css']
})
export class UserPreferencesComponent implements OnInit {

  // Complete list of genres for drop-down menu
  preferences:UserPreference = new UserPreference("","",[],0,0,0);
  allGenres: string[] = genres;
  userPreferenceForm = new FormGroup({
    genreControls: new FormArray([]),
    imdb: new FormControl()
  });

  genreControls: FormArray = this.userPreferenceForm.get('genreControls') as FormArray;

  constructor(private userPreferencesService: UserPreferencesService) {

  }

  ngOnInit(): void {
    this.prePopulateForm();
  }

  prePopulateForm () {
    for(let i = 0; i < this.allGenres.length; i++) {
      this.genreControls.push(new FormControl());
    }
    this.getPreferences();
  }
  onSubmit() {

    let imdb_rating = this.userPreferenceForm.get('imdb')!.value;
    let selectedGenres = [];
    for(let i=0;i<this.genreControls.length;i++) {
      if(this.genreControls.at(i).value) {
        selectedGenres.push(this.allGenres[i]);
      }
    }
    this.userPreferencesService.patchUserPreferences(selectedGenres,imdb_rating).subscribe();

  }

  formatLabel(value: number) {
    return value;
  }

  getPreferences(): void{
    this.userPreferencesService.getUserPreferences().subscribe(preferences =>
    {
      this.preferences=preferences;
      console.log(this.preferences);
      //Pre-populate the form
      let formObj:any = {};
      formObj.imdb = this.preferences.imdb_rating;

      for (let x of this.preferences.genres) {
        let i = this.allGenres.indexOf(x);
        this.genreControls.at(i).setValue(true);
      }
      //console.log(formObj);
      this.userPreferenceForm.patchValue(formObj);

    });

  }

}
