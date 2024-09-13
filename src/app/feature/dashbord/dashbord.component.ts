import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WeatherService } from '../../core/services/weather.service';
@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.css',
})
export class DashbordComponent {
  @ViewChild('weatherDialog') weatherDialog!: TemplateRef<any>;
  weatherData: any = {};
  constructor(
    private weatherService: WeatherService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadWeatherData();
  }

  // Load weather data from API
  loadWeatherData() {
    this.weatherService.getWeatherData().subscribe(
      (data: any) => {
        console.log(data);
        this.weatherData = {
          location: data.location.name,
          last_updated: data.current.last_updated,
          humidity: data.current.humidity,
          air_quality: data.current.wind_kph,
        };
      },
      (error) => {
        console.error('Error fetching weather data', error);
      }
    );
  }

  // Open the modal popup with weather details
  openWeatherModal() {
    this.dialog.open(this.weatherDialog);
  }
}
