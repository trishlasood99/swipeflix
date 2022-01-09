// Angular Imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material Imports
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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TabNavbarComponent } from './components/tab-navbar/tab-navbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MovieQueueComponent } from './components/movie-queue/movie-queue.component';
import { MatchQueueComponent } from './components/match-queue/match-queue.component';
import { UserPreferencesComponent } from './components/profile/user-preferences/user-preferences.component';
import { FriendsComponent } from './components/profile/friends/friends.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';

import { authInterceptorProviders } from './interceptors/auth.interceptor';

//AppRoutingModule has to be placed after ProfileModule
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TabNavbarComponent,
    ProfileComponent,
    MovieQueueComponent,
    MatchQueueComponent,
    SignUpComponent,
    LogInComponent,
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
    MatDatepickerModule,
    MatSliderModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatStepperModule,
    ProfileModule,
    AppRoutingModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
