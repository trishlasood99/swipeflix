// TODO: tidy up import statements
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProfileModule } from './components/profile/profile.module';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TabNavbarComponent } from './components/tab-navbar/tab-navbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MovieQueueComponent } from './components/movie-queue/movie-queue.component';
import { MatchQueueComponent } from './components/match-queue/match-queue.component';
import { UserPreferencesComponent } from './components/profile/user-preferences/user-preferences.component';
import { FriendsComponent } from './components/profile/friends/friends.component';

//AppRoutingModule has to be placed after ProfileModule
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TabNavbarComponent,
    ProfileComponent,
    MovieQueueComponent,
    MatchQueueComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatMenuModule,
    MatGridListModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSliderModule,
    ProfileModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
