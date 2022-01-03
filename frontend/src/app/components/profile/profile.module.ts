import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { ProfileRoutingModule } from './profile-routing.module';

import { FriendsComponent } from './friends/friends.component';
import { UserPreferencesComponent } from './user-preferences/user-preferences.component';
import { ProfileComponent } from './profile.component';

// The @NgModule() decorator is a function that takes a single metadata object, whose properties describe the module.
// The meta data object contains:
// imports: Other modules whose exported classes are needed by component templates declared in this NgModule
// declarations: The components, directives, and pipes that belong to this NgModule.

@NgModule({
  imports: [
    MatGridListModule,
    MatListModule,
    ProfileRoutingModule,
  ],
  declarations: [
    FriendsComponent,
    UserPreferencesComponent,
  ]
})

export class ProfileModule {}
