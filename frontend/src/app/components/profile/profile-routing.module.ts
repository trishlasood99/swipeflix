import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FriendsComponent } from './friends/friends.component';
import { UserPreferencesComponent } from './user-preferences/user-preferences.component';
import {ProfileComponent} from './profile.component';

const profileRoutes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path:'preferences',
        component: UserPreferencesComponent,
      },
      {
        path:'friends',
        component: FriendsComponent,
      },
    ]
  }
  //{ path: '\preferences', component: UserPreferencesComponent },
  //{ path: '\friends', component: FriendsComponent },
  //{ path: '', component: ProfileComponent},
];

/*
Only call RouterModule.forRoot() in the root AppRoutingModule
(or the AppModule if that's where you register top level application routes).
In any other module, you must call the RouterModule.forChild() method
to register additional routes.
*/

@NgModule({
  imports: [RouterModule.forChild(profileRoutes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
