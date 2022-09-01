import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private userSub!: Subscription;
  isAuth = false;

  constructor(private aService: AuthService) {}

  ngOnInit() {
    this.userSub = this.aService.user.subscribe((user) => {
      this.isAuth = !!user;
    });
  }
  onLogout() {
    this.aService.logout()
  }
}
