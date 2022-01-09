import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });

  constructor(private authService: AuthService, private tokenService: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.signIn(this.loginForm.get('username')!.value, this.loginForm.get('password')!.value).subscribe((data:any) => {
      this.tokenService.saveToken(data.accessToken);
      console.log(this.tokenService.getToken());
      this.router.navigateByUrl('/movies');
    }, err => {
      console.log(err.error.message);
    });
  }
}
