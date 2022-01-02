import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './components/profile/profile.component';
import { MovieQueueComponent } from './components/movie-queue/movie-queue.component';
import { MatchQueueComponent } from './components/match-queue/match-queue.component';
import { AppComponent} from './app.component';

const routes: Routes = [
  { path: '\profile', component: ProfileComponent },
  { path: '\movies', component: MovieQueueComponent },
  { path: '\matches', component: MatchQueueComponent },
  //{ path: '', component: AppComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
