import { tap } from 'rxjs';
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
  linksArr: linkObj[] = [];

  getLinks() {
    return this.linksArr.slice();
  }

  setLinks(links: linkObj[]) {
    this.linksArr = links;
    this.linksArrChanged.next(this.linksArr.slice());
  }

  addLinkObj(link: linkObj) {
    this.linksArr.push(link);
    this.newLink = link.short;
    this.linksArrChanged.next(this.linksArr.slice());
  }

  fetchLinks() {
    return this.http
      .get<linkObj[]>(
        'http://79.143.31.216/statistics?order=asc_short&offset=0&limit=100'
      )
      .pipe(
        tap((links) => {
          this.setLinks(links);
        })
      );
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


