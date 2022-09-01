import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs';
import { Subject } from 'rxjs';
import { linkObj } from './link.model';


@Injectable()
export class LinkService {
  constructor(private http: HttpClient) {}
  linksArrChanged = new Subject<linkObj[] | null>();
  linksArr: linkObj[] = [
    {
      id: 1,
      short: 'https://localhost:420100/',
      target: 'https://localhost:4200',
      counter: 30,
    },
    {
      id: 2,
      short: 'https://localhost:420100/',
      target: 'https://localhost:4200',
      counter: 30,
    },
    {
      id: 3,
      short: 'https://localhost:420100/',
      target: 'https://localhost:4200',
      counter: 30,
    },
    {
      id: 4,
      short: 'https://localhost:420100/',
      target: 'https://localhost:4200',
      counter: 30,
    },
  ];

  getLinks() {
    return this.linksArr.slice();
  }

  transformLink(form: NgForm) {
    const longLink = form.value.longLink;

    if (localStorage['userData']) {
    let token = JSON.parse(localStorage['userData']);
    let headers = new Headers
    headers.append(
      'Authorization',
      ''+token.access_token+' '+token.token_type+''
    );
    console.log (headers)
    }
    return this.http
      .post<linkObj>('http://79.143.31.216/squeeze?link=' + longLink,'')
      .pipe(
        map((res) => {
          console.log(res);
        })
      );}

  }

  // this.addLink(newLinkObj);

//   addLink(newLinkObj: linkObj) {
//   //   this.linksArr.push(newLinkObj);
//   //   this.linksArrChanged.next(this.linksArr.slice());
//   // }
// }
