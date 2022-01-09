import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { ProfileRoutingModule } from './profile-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { FriendsComponent } from './friends/friends.component';
import { UserPreferencesComponent } from './user-preferences/user-preferences.component';
import { ProfileComponent } from './profile.component';
import { MatIconModule } from '@angular/material/icon';
// The @NgModule() decorator is a function that takes a single metadata object, whose properties describe the module.
// The meta data object contains:
// imports: Other modules whose exported classes are needed by component templates declared in this NgModule
// declarations: The components, directives, and pipes that belong to this NgModule.

@NgModule({
  imports: [
    CommonModule,
    MatGridListModule,
    MatListModule,
    ProfileRoutingModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSliderModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
  ],
  declarations: [
    FriendsComponent,
    UserPreferencesComponent,
  ]
})

export class ProfileModule {}
