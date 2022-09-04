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
  newLink: string;

  addLinkObj(link: linkObj) {
    this.newLink = link.short;
  }

  transformLink(form: NgForm) {
    const longLink = form.value.longLink;
    return this.http
      .post<any>('http://79.143.31.216/squeeze?link=' + longLink, '')
      .pipe(
        map((result) => {
          this.addLinkObj(result);
        })
      );
  }
}


