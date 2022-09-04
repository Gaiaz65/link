import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {  AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoading = false;
  constructor(private authService: AuthService,
    private router: Router) {}

  ngOnInit() {}

  onSubmit(loginForm: NgForm) {
    if (!loginForm.valid) {
      return;
    }
    this.isLoading = true;

    const username = loginForm.value.username;
    const password = loginForm.value.password;
    let authObs = this.authService.login(username, password);

    authObs.subscribe(
      res => {
        this.isLoading = false;
        this.router.navigate(['/'])
      },
      error => {
        this.router.navigate(['/']);
        this.isLoading = false;
      }
    );
  }
}
