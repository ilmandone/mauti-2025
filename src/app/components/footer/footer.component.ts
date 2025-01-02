import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {GeoLocationCoords, getGeolocationCoords} from '../../shared/geolocation';
import {map, Observable, timer} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {WeatherData, WeatherService} from '../../shared/services/weather.service';
import {AsyncPipe} from '@angular/common';
import {checkMobile} from '../../shared/detect.mobile';

interface TimeData {
  day: string
  month: string
  year: string
  hour: string
  minute: string
}

@Component({
  selector: 'footer[app-footer]',
  imports: [
    AsyncPipe
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {

  private _destroyRef = inject(DestroyRef)
  private _weatherSrv = inject(WeatherService)

  geoLocationCoords!: GeoLocationCoords
  isMobile = checkMobile()
  timeData: TimeData | null = null
  weatherData!: Observable<WeatherData>

  /**
   * Return and observable that each minute give the current day and time
   * @private
   */
  private getCurrentTimeObservable(): Observable<TimeData> {
    return timer(0, 60000).pipe(
      map(() => {
        const now = new Date()
        return {
          day: now.getDate().toString().padStart(2, '0'),
          month: (now.getUTCMonth() + 1).toString().padStart(2, '0'),
          year: now.getFullYear().toString(),
          hour: now.getHours().toString().padStart(2,'0'),
          minute: now.getMinutes().toString().padStart(2,'0')
        }
      })
    )
  }

  ngOnInit() {
    this.geoLocationCoords = getGeolocationCoords()
    this.getCurrentTimeObservable().pipe(
      takeUntilDestroyed(this._destroyRef)
    ).subscribe(r => {
      this.timeData = r
    })

    this.weatherData = this._weatherSrv.getWeatherDataByLocation(this.geoLocationCoords.lat, this.geoLocationCoords.lon)
  }
}
