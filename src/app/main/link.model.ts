import { HttpClient } from '@angular/common/http';
import { SortDirection } from '@angular/material/sort';
import { Observable } from 'rxjs';

export interface linkObj {
  id: number;
  short:string;
  target: string;
  counter: number;
}

export class linksDb {
  constructor(private _httpClient: HttpClient) {}

  getLinks(
    sort: string,
    order: SortDirection,
    page: number,
    limit: number
  ): Observable<linkObj[]> {
    const href = 'http://79.143.31.216/statistics';
    const offset = page * limit;
    console.log(offset);
    const requestUrl = `${href}?order=${order}_${sort}&offset=${offset}&limit=${limit}`;

    return this._httpClient.get<linkObj[]>(requestUrl);
  }
}
