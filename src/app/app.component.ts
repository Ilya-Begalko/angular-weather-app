import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-weather-app';

  cityName?: string;
  weatherData: any = {
    location: '',
    tempC: null,
    feelsLike: null,
    cloud: null,
    humidity: null,
    wind: null
  };

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((data: any) => {
        let coord = this.getCoords(data);
        this.getWeatherData(coord ? coord : 'London');
      })
    } else {
      this.getWeatherData(this.cityName ? this.cityName : 'London');
    }
  }

  onSubmit() {
    this.getWeatherData(this.cityName ? this.cityName : 'London');
    this.cityName = '';
  }

  getCoords(data: any) {
    return data.coords.latitude + ',' + data.coords.longitude
  };

  getWeatherData(name: string) {
    this.weatherService.getWeatherData(name).subscribe((data: any) => {
      this.weatherData.location = data.location.name;
      this.weatherData.tempC = data.current.temp_c;
      this.weatherData.cloud = data.current.cloud;
      this.weatherData.feelsLike = data.current.feelslike_c;
      this.weatherData.humidity = data.current.humidity;
      this.weatherData.wind = data.current.wind_kph;
    });
  }
}
