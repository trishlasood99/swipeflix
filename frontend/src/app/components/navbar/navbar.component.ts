import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private tokenService: TokenStorageService) {
  }

  ngOnInit(): void {
    if(this.tokenService.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onLogOut(): void{
    this.tokenService.signOut();
  }
}
