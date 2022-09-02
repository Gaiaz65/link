import { HttpClient } from '@angular/common/http';
import { AuthService } from './../../auth/auth.service';
import { LinkService } from './../link.service';
import { Clipboard } from '@angular/cdk/clipboard';
import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  DoCheck,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { linkObj } from '../link.model';
import { merge, startWith, switchMap, map, catchError, Observable } from 'rxjs';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsComponent implements OnInit, AfterViewInit, DoCheck {
  loading = false;
  displayedColumns = ['id', 'initialLink', 'transformedLink', 'visits'];
  dataSource = new MatTableDataSource<linkObj>();

  // data:linkObj[]=[]
  resultsLength: any;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginatior!: MatPaginator;

  constructor(
    private authService: AuthService,
    private lService: LinkService,
    private cdr: ChangeDetectorRef,
    private clipboard: Clipboard,
    private httpclient:HttpClient,
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginatior;

    // this.sort.sortChange.subscribe(() => (this.paginatior.pageIndex = 0));

    // merge(this.sort.sortChange, this.paginatior.page)
    //   .pipe(
    //     startWith([]),
    //     switchMap(() => {
    //       this.loading = true;
    //       return this.getSortedLinks(
    //         this.sort.active,
    //         this.sort.direction,
    //         this.paginatior.pageIndex
    //       ).pipe(catchError(() => observableOf(null)));
    //     }),
    //     map((links) => {
    //       this.loading = false;

    //       if (links === null) {
    //         return [];
    //       }
    //       this.resultsLength = '100+';
    //       return links;
    //     })
    //   )
    //   .subscribe((links) => this.lService.linksArr);
  }

  ngDoCheck() {
    if (this.dataSource.data.length != this.lService.getLinks().length) {
      this.cdr.markForCheck();
      this.dataSource.data = this.lService.getLinks();
    }
  }
  onFetchlinks() {
    this.loading = true;
    this.lService.fetchLinks().subscribe((links) => {
      this.loading = false;
      this.cdr.markForCheck();
    });
  }

  copyToClipboard(link: string) {
    this.clipboard.copy('http://79.143.31.216/s/' + link);
  }

  ngOnInit() {
    if (this.authService.isAuth) {
      this.onFetchlinks();
    }
    this.dataSource.data = this.lService.getLinks();
  }

  doFilter(filterValue: any) {
    if (filterValue.value != null) {
      this.dataSource.filter = filterValue.value.trim().toLowerCase();
    } else {
      this.dataSource;
    }
  }

  getSortedLinks(sort: string, order: SortDirection, page: number){
    return this.httpclient.get<linkObj[]>('')
  }
}

