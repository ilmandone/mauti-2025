import { Injectable } from '@angular/core';
import { map, Observable, of, timer } from 'rxjs';


export const DEFAULT_POSITION = { lat: 44.4598629, lon: 11.1955072 };

export interface GeoLocationCoords {
  lat: number;
  lon: number;
}

interface TimeData {
  day: string;
  month: string;
  year: string;
  hour: string;
  minute: string;
}


@Injectable()
export class GeoTimeService {

  currentTimeObs(): Observable<TimeData> {
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

  geoPositionObs(enabled: boolean): Observable<GeoLocationCoords> {
    const geolocation = navigator.geolocation;
    const noPosMsg = 'Use default position';

    if (!navigator.geolocation || !enabled) {
      return of(DEFAULT_POSITION);
    }

    return new Observable<GeoLocationCoords>((subscriber) => {
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
  };
}
