import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  newLink!: string;
  linkStr:string='Your STR';

  displayedColumns = ['initialLink', 'transformedLink', 'visits'];
  dataSource = new MatTableDataSource<void>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginatior!: MatPaginator;

  doFilter(filterValue: any) {
    if (filterValue.value != null) {
      this.dataSource.filter = filterValue.value.trim().toLowerCase();
    } else {
      this.dataSource;
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginatior;
  }

  constructor(private clipboard: Clipboard) {}

  ngOnInit(): void {}
}
