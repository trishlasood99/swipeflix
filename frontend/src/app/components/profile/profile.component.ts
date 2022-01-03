import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  tiles = [
      {
        row:1,
        col:1,
      },
      {
        row:1,
        col:4,
      },
    ];
  sideBarColor = '#FFF8E1';
  constructor() { }

  ngOnInit(): void {
  }

}
