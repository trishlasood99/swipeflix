import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './components/profile/profile.component';
import { MovieQueueComponent } from './components/movie-queue/movie-queue.component';
import { MatchQueueComponent } from './components/match-queue/match-queue.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';

const routes: Routes = [
  //{ path: '\profile', component: ProfileComponent },
  { path: '\movies', component: MovieQueueComponent },
  { path: '\matches', component: MatchQueueComponent },
  {
    path: '\profile',
    loadChildren: () => import('./components/profile/profile.module').then(m => m.ProfileModule),
  },
  { path: '\signup', component: SignUpComponent },
  { path: '\login', component: LogInComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
