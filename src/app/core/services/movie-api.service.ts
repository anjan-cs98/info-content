import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieApiService {
  private movieApiUrl = 'https://freetestapi.com/api/v1/movies';

  constructor(private http: HttpClient) {}
  // Function to fetch weather data
  getMovieData(): Observable<any> {
    const url = `${this.movieApiUrl}`;
    return this.http.get(url);
  }
}
