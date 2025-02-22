import { Injectable } from '@angular/core';
import { combineLatest, map, Observable, of, startWith, timer } from 'rxjs';

export interface GeoCoords {
  lat: number;
  lon: number;
}

export const DEFAULT_POSITION: GeoCoords = { lat: 44.4598629, lon: 11.1955072 };

interface Time {
  day: string;
  month: string;
  year: string;
  hour: string;
  minute: string;
}

@Injectable()
export class GeoTimeService {

  /**
   * Return and observable that fire day and time info every 60 seconds
   * @private
   * @memberOf GeoTimeService
   */
  private _currentTimeObs(): Observable<Time> {
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
   * Return a cold observable that return user or default position
   * @param {boolean} enabled
   * @private
   * @memberOf GeoTimeService
   */
  private _geoPositionObs(enabled: boolean): Observable<GeoCoords> {
    const geolocation = navigator.geolocation;
    const noPosMsg = 'Use default position';

    if (!navigator.geolocation || !enabled) {
      return of(DEFAULT_POSITION);
    }

    return new Observable<GeoCoords>((subscriber) => {
      geolocation.getCurrentPosition(
        (position) => {
          subscriber.next({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          subscriber.complete();
        },
        (error) => {
          console.warn(noPosMsg);
          console.error(error);
          subscriber.next(DEFAULT_POSITION);
          subscriber.complete();
        }
      );
    });
  }

  /**
   * Return an observable with user or default position and current time updated each minute
   * @param {boolean} enabled
   * @memberOf GeoTimeService
   */
  getPosAndTimeObs (enabled: boolean): Observable<{pos: GeoCoords, time: Time}> {
    return combineLatest({
      pos: this._geoPositionObs(enabled).pipe(startWith(DEFAULT_POSITION)),
      time: this._currentTimeObs(),
    })
  }
}
