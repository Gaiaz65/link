import { LinkService } from './../link.service';
import {
  Component,
  OnInit,
  ViewChild,
  SimpleChanges,
  AfterViewInit,
  DoCheck,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { linkObj } from '../link.model';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsComponent implements OnInit, AfterViewInit, DoCheck {
  displayedColumns = ['id','initialLink', 'transformedLink', 'visits'];
  dataSource = new MatTableDataSource<linkObj>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginatior!: MatPaginator;

  constructor(private lService: LinkService, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginatior;
  }

  ngDoCheck(): void {
    if (this.dataSource.data.length != this.lService.getLinks().length) {
      this.cdr.markForCheck();
      this.dataSource.data = this.lService.getLinks();
    }
  }

  ngOnInit() {
    this.dataSource.data = this.lService.getLinks();
  }

  doFilter(filterValue: any) {
    if (filterValue.value != null) {
      this.dataSource.filter = filterValue.value.trim().toLowerCase();
    } else {
      this.dataSource;
    }
  }
}
