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
  newLink:string;
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

  addLinkObj(link:linkObj) {
    this.linksArr.push(link);
    this.newLink = link.short
    this.linksArrChanged.next( this.linksArr.slice())
  }


  transformLink(form: NgForm) {
    const longLink = form.value.longLink;

    return this.http
      .post<any>('http://79.143.31.216/squeeze?link=' + longLink, '')
      .pipe(
        map((result) => {
          console.log(result);
          this.addLinkObj(result);
        })
      );
  }

  }


