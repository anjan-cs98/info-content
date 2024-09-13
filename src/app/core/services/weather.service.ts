import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private weatherApiUrl = 'https://api.weatherapi.com/v1/current.json';
  private apiKey = '605754657aeb445eb9495825241309';

  constructor(private http: HttpClient) {}

  // Function to fetch weather data
  getWeatherData(): Observable<any> {
    const url = `${this.weatherApiUrl}?key=${this.apiKey}&q=KOLKATA`;
    return this.http.get(url);
  }
}
