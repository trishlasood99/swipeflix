import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

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

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.signIn(this.loginForm.get('username')!.value, this.loginForm.get('password')!.value);
  }
}
