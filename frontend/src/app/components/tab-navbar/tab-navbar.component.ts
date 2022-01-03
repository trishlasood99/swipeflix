import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab-navbar',
  templateUrl: './tab-navbar.component.html',
  styleUrls: ['./tab-navbar.component.css']
})
export class TabNavbarComponent implements OnInit {
//  links = ['Profile', 'Movies', 'Matches'];
  links = [
    {
      label:'Profile',
      link: '/profile'
    },
    {
      label: 'Movies',
      link: '/movies'
    },
    {
      label: 'Matches',
      link: '/matches'
    }
  ];
  activeLink = this.links[0].link;
  background:ThemePalette = 'accent';

  onClick(item: { label: string, link: string }) {
    this.activeLink = item.link;
    this.router.navigateByUrl(item.link);
  }
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

}
