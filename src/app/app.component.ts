import { Component } from '@angular/core';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-weather-app';

  constructor(private weatherService: WeatherService){
    this.weatherService.getWeatherData('').subscribe((data:any)=>{
      console.warn(data)
    })
    
  }
}
