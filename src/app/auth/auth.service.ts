import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { User } from './user.model';
import { LinkService } from '../main/link.service';

export interface LoginResponseData {
  username?: string;
  access_token: string;
  token_type: string;
  expiration?: Date;
}
export interface RegisterResponse {
  username: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  isAuth = false;
  constructor(private http: HttpClient,
    private router:Router,
    private linkService:LinkService) {}

  register(username: string, password: string) {
    return this.http
      .post<RegisterResponse>(
        'http://79.143.31.216/register?username=' +
          username +
          '&password=' +
          password,
        ''
      )
      .pipe(
        tap((logData) => {
        })
      );
  }

  login(username: string, password: string) {
    let params = new HttpParams({
      fromObject: {
        grant_type: '',
        username: username,
        password: password,
        scope: '',
        client_id: '',
        client_secret: '',
      },
    });
    let httpContent = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };

    return this.http
      .post<LoginResponseData>(
        'http://79.143.31.216/login',
        params.toString(),
        httpContent
      )
      .pipe(
        map(
          (logData) => {
            this.handleAuthentication(
              logData.token_type,
              logData.access_token,
            );
          },
          (error: any) => {
            console.log('return http error', error);
            return error;
          }
        )
      );
  }

  autoLogin(){
    const storedUser = JSON.parse(localStorage.getItem('userData'));
    if (!storedUser) {
      return
    }

    const loadedUser = new User (
     storedUser.access_token,
     storedUser.token_type
    )
    this.user.next(loadedUser);
    setTimeout(() => {
      this.linkService.fetchLinks().subscribe();
    }, 1000);
  }

  private handleAuthentication(
    token_type: string,
    access_token: string,
  ) {
    this.isAuth = true;
    const user = new User(token_type, access_token);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    console.dir(JSON.parse(localStorage['userData']));
  }

  logout() {
    this.isAuth = false;
    this.user.next(null);
    this.router.navigate(['/signup']);
    localStorage.removeItem('userData');
  }
}
