import { Component, OnInit } from '@angular/core';
import { genres } from '../../../assets/genres';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserPreferencesService } from '../../services/user-preferences.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  genres: string[] = genres;
  signUpForm = new FormGroup({
    username: new FormControl(),
    email: new FormControl(),
    password: new FormControl()
  });

  userPreferencesForm = new FormGroup({
    genresList: new FormArray([]),
    imdb: new FormControl()
  });

  // Otherwise this.userPreferenceForm.get('genresList') will return as AbstractControl
  genresList:FormArray = this.userPreferencesForm.get('genresList') as FormArray;

  constructor(private authService: AuthService, private userPreferencesService: UserPreferencesService) { }

  ngOnInit(): void {
    this.populateForm();
  }

  formatLabel(value: number) {
    return value;
  }

  /*
  Creates a FormArray of FormControls based on size of genres List
  adds the form array to the userPreferencesForm FormGroup
  Called in ngOnInit
  */
  populateForm() {
    for ( let i = 0; i < this.genres.length; i++) {
      this.genresList.push(new FormControl());
    }
  }

  /*
  Called when user submits first section of the user registration form
  Calls the sign-in service to create a user in the database
  */
  signUp() {
    let user = new User(this.signUpForm.get('username')!.value, this.signUpForm.get('email')!.value,
      this.signUpForm.get('password')!.value);
    this.authService.signUp(user).subscribe((data:any) => console.log(data.message));
  }

  setUserPreferences() {
    let selectedGenres = [];
    for (let i = 0; i < this.genresList.length; i++) {
        if (this.genresList.at(i).value) {
          selectedGenres.push(this.genres[i]);
        }
    }
    let minRating = this.userPreferencesForm.get('imdb')!.value||0;
    this.userPreferencesService.postUserPreferences(selectedGenres, minRating);
  }

}
