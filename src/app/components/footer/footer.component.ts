import { Component, DestroyRef, effect, HostBinding, inject, input } from '@angular/core';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WeatherData, WeatherService } from '../../shared/services/weather.service';
import { AsyncPipe } from '@angular/common';
import { ScreenSizeService } from '../../shared/services/screen-size.service';
import { StateService } from '../../shared/services/state.service';
import { ScrollKeys } from '../../shared/directives/infinite-scroll.utils';
import { NoiseSvgComponent } from '@components/noise-svg/noise-svg.component';
import { ANIMATION_DELAY } from '../../shared/commons';
import { AckService } from '../../shared/services/ack.service';
import { GeoCoords, GeoTimeService } from '../../shared/services/geoTime.service';
import { ButtonComponent } from '@components/button/button.component';

interface TimeData {
  day: string;
  month: string;
  year: string;
  hour: string;
  minute: string;
}

@Component({
  selector: 'footer[app-footer]',
  imports: [AsyncPipe, NoiseSvgComponent, ButtonComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  providers: [GeoTimeService],
})
export class FooterComponent {
  private _state = inject(StateService);
  private _destroyRef = inject(DestroyRef);
  private _screenSizeSrv = inject(ScreenSizeService);
  private _weatherSrv = inject(WeatherService);
  private _ackSrv = inject(AckService);
  private _geoTimeSrv = inject(GeoTimeService);

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

  geoPosition!: GeoCoords;
  timeData: TimeData | null = null;
  weatherData!: Observable<WeatherData>;

  constructor() {
    effect(() => {
      if (this._state.ready()) {
        this.isDesktop = this._screenSizeSrv.relatedTo('tl') !== 'after';

        // Get geolocation only for desktop
        if (this.isDesktop && !this.geoPosition) {
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
   * Get user position one time + get time and relative weather data each minutes
   * @private
   */
  private _startGeolocation(override? :boolean ) {
    this._geoTimeSrv
      .getPosAndTimeObs(override ?? this._ackSrv.ack()!)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(({ pos, time }) => {
        this.geoPosition = pos;
        this.timeData = time;

        console.log(this.geoPosition);
        const { lat, lon } = this.geoPosition;

        this.weatherData = this._weatherSrv.getWeatherDataByLocation(lat, lon);
      });
  }

  /**
   * Set ACK to true and enable the Geolocation
   */
  enableGeoPosition() {
    this._ackSrv.setAck(true)
    this._startGeolocation(true);
  }
}
