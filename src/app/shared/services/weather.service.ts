import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';

interface WeatherQueryData {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  current_units: CurrentUnits
  current: Current
}

interface CurrentUnits {
  time: string
  interval: string
  temperature_2m: string
  wind_speed_10m: string
  wind_direction_10m: string
  precipitation_probability: string
}

interface Current {
  time: string
  interval: number
  temperature_2m: number
  wind_speed_10m: number
  wind_direction_10m: number
  precipitation_probability: number
}

export interface WeatherData {
  temp: string,
  windSpeed: string,
  windDirection: string
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private _httpClient = inject(HttpClient)

  getWeatherDataByLocation(lat: number, lon: number): Observable<WeatherData> {
    return this._httpClient
      .get<WeatherQueryData>(`https://api.open-meteo.com/v1/forecast?latitude=${lat.toFixed(4)}&longitude=${lon.toFixed(4)}&current=temperature_2m,wind_speed_10m,wind_direction_10m,precipitation_probability`)
      .pipe(
        map((r) => {
          return {
            temp: `${r.current.temperature_2m} ${r.current_units.temperature_2m}`,
            windSpeed: `${r.current.wind_speed_10m} ${r.current_units.wind_speed_10m}`,
            windDirection: `${r.current.wind_direction_10m} ${r.current_units.wind_direction_10m}`
          }
        })
      )
  }
}
