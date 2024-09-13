import { Component, OnInit } from '@angular/core';
import { MovieApiService } from '../../core/services/movie-api.service';
import { MatTableDataSource } from '@angular/material/table';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.component.html',
  styleUrl: './movielist.component.css',
})
export class MovielistComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: any;
  @ViewChild(MatSort) sort: any;

  movieData: any = [];
  movieList: any = [];
  displayedColumns: string[] = [
    'title',
    'rating',
    'poster',
    'language',
    'year',
  ];
  dataSource = new MatTableDataSource();
  constructor(private movieapi: MovieApiService) {}

  ngOnInit(): void {
    this.loadMovieData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  // Load weather data from API
  loadMovieData() {
    this.movieapi.getMovieData().subscribe(
      (data: any) => {
        console.log(data);
        this.movieData = data;
        data.map((list: any) => {
          //console.log(list);
          this.movieList.push({
            title: list.title,
            rating: list.rating,
            poster: list.poster,
            language: list.language,
            year: list.year,
          });
        });
        console.log(this.movieList);
        console.log(this.dataSource);
        this.dataSource.data = this.movieList;
      },
      (error) => {
        console.error('Error fetching weather data', error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
