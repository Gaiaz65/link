
import { HttpClient } from '@angular/common/http';
import { LinkService } from './../link.service';
import { Clipboard } from '@angular/cdk/clipboard';
import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { linkObj, linksDb } from '../link.model';
import { merge, startWith, switchMap, map, of as observableOf } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsComponent implements OnInit, AfterViewInit {
  linksDatabase: linksDb | null;
  link: linkObj;
  loading = false;
  displayedColumns = [ 'target', 'short', 'counter'];
  dataSource = new MatTableDataSource<linkObj>();
  resultsLength: any;

  data:linkObj[]=[]

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private cdr: ChangeDetectorRef,
    private clipboard: Clipboard,
    private httpclient: HttpClient
  ) {}

  ngAfterViewInit() {
    this.linksDatabase = new linksDb(this.httpclient);

    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
    });

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.loading = true;
          return this.linksDatabase!.getLinks(
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
            this.paginator.pageSize
          ).pipe(catchError(() => observableOf(null)));
        }),
        map((data) => {

          this.loading = false;

          if (data === null) {
            return [];
          }
          return data;
        })
      )
      .subscribe((data) => {
        this.data = data;
        this.cdr.markForCheck();
        this.resultsLength =
          this.paginator.pageSize * this.paginator.pageIndex +
          this.paginator.pageSize * 2;
      });
  }


  copyToClipboard(link: string) {
    this.clipboard.copy('http://79.143.31.216/s/' + link);
  }

  ngOnInit() {}

}

