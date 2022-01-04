import { Component, OnInit } from '@angular/core';
import { UserPreference } from '../../../models/user-preference.model';
import { FormGroup, FormControl } from '@angular/forms';
import { UserPreferencesService } from '../../../services/user-preferences.service';

@Component({
  selector: 'app-user-preferences',
  templateUrl: './user-preferences.component.html',
  styleUrls: ['./user-preferences.component.css']
})
export class UserPreferencesComponent implements OnInit {

  // Complete list of genres for drop-down menu
  // selectedGenres: Map = new Map();
  preferences:UserPreference = new UserPreference("","",[],0,0,0);
  allGenres: string[] = ['Action', 'Drama', 'Thriller', 'Family', 'Sci-Fi', 'Romance', 'Comedy', 'Documentary', 'Fantasy'];
  userPreferenceForm = new FormGroup(
    {
      imdb: new FormControl(),
      action: new FormControl(),
      drama: new FormControl(),
      thriller: new FormControl(),
      family: new FormControl(),
      sciFi: new FormControl(),
      romance: new FormControl(),
      comedy: new FormControl(),
      documentary: new FormControl(),
      fantasy: new FormControl()
    }
  );


  constructor(private userPreferencesService: UserPreferencesService) {

  }

  ngOnInit(): void {
    this.getPreferences();


  }

  onSubmit() {
    console.log(this.userPreferenceForm.value);
    // TODO: form processing
    // TODO: call service to create/update preferences
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
      var formObj:any = {};
      formObj.imdb = this.preferences.imdb_rating;

      for (let x of this.preferences.genres) {
        if(x=='Sci-Fi') {
          formObj.sciFi=true;
        } else {
          formObj[x.toLowerCase()]=true;
        }
      }
      console.log(formObj);
      this.userPreferenceForm.patchValue(formObj);

    });

  }
}

// this.preferences=new UserPreference(preferences._id,preferences.user,preferences.genres,preferences.imdb_rating,preferences.page,preferences.__v));
