import { Component, DestroyRef, effect, HostBinding, inject, input } from '@angular/core';
import { GeoLocationCoords, getGeolocationCoords } from '../../shared/geolocation';
import { map, Observable, switchMap, tap, timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WeatherData, WeatherService } from '../../shared/services/weather.service';
import { AsyncPipe } from '@angular/common';
import { ScreenSizeService } from '../../shared/services/screen-size.service';
import { StateService } from '../../shared/services/state.service';
import { ScrollKeys } from '../../shared/directives/infinite-scroll.utils';
import { NoiseSvgComponent } from '@components/noise-svg/noise-svg.component';
import { ANIMATION_DELAY } from '../../shared/commons';
import { AckService } from '../../shared/services/ack.service';

interface TimeData {
  day: string;
  month: string;
  year: string;
  hour: string;
  minute: string;
}

@Component({
  selector: 'footer[app-footer]',
  imports: [AsyncPipe, NoiseSvgComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  private _state = inject(StateService);
  private _destroyRef = inject(DestroyRef);
  private _screenSizeSrv = inject(ScreenSizeService);
  private _weatherSrv = inject(WeatherService);
  private _ackSrv = inject(AckService);

  @HostBinding('class.show-geo') isDesktop = false;
  @HostBinding('class.show') show = false;

  scrollPercentage = input<number>(0);
  scrollDirection = input<ScrollKeys | undefined>(undefined);

  /*scrollBinary = computed(() => {
    const binaries = (this.scrollPercentage() >>> 0)
      .toString(2)
      .padStart(7, '0')
      .split('');
    return binaries.map((v) => {
      return v === '1';
    });
  });*/

  geoLocationCoords!: GeoLocationCoords;
  timeData: TimeData | null = null;
  weatherData!: Observable<WeatherData>;

  constructor() {
    effect(() => {
      if (this._state.ready()) {
        this.isDesktop = this._screenSizeSrv.relatedTo('tl') !== 'after';

        // Get geolocation only for desktop
        if (this.isDesktop && !this.geoLocationCoords) {
          this._startGeolocation();
        }

        // Show UI
        setTimeout(() => {
          this.show = this._state.ready();
        }, ANIMATION_DELAY);
      }
    });
  }

  /**
   * Return and observable that each minute give the current day and time
   * @private
   */
  private getCurrentTimeObservable(): Observable<TimeData> {
    return timer(0, 60000).pipe(
      map(() => {
        const now = new Date();
        return {
          day: now.getDate().toString().padStart(2, '0'),
          month: (now.getUTCMonth() + 1).toString().padStart(2, '0'),
          year: now.getFullYear().toString(),
          hour: now.getHours().toString().padStart(2, '0'),
          minute: now.getMinutes().toString().padStart(2, '0'),
        };
      })
    );
  }

  /**
   * Get geolocation and weather data
   * @private
   */
  private _startGeolocation() {
    getGeolocationCoords(this._ackSrv.ack()!)
      .pipe(
        tap((r) => {
          this.geoLocationCoords = r;
        }),
        switchMap(() => {
          return this.getCurrentTimeObservable().pipe(takeUntilDestroyed(this._destroyRef));
        })
      )
      .subscribe((r) => {
        this.timeData = r;
        this.weatherData = this._weatherSrv.getWeatherDataByLocation(
          this.geoLocationCoords.lat,
          this.geoLocationCoords.lon
        );
      });
  }
}
