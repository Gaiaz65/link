import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  isLoading = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(signupForm: NgForm) {
    if (!signupForm.valid) {
      return;
    }
    this.isLoading = true;
    const username = signupForm.value.username;
    const password = signupForm.value.password;
    this.authService.register(username, password).subscribe(
      (res: any) => {
        this.authService.isAuth = true;
        this.isLoading = false;
        this.router.navigate(['/login']);
      },
      (errorMessage: any) => {
        this.isLoading = false;
        signupForm.reset();
      }
    );
  }

}
