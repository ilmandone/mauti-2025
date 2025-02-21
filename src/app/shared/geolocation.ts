import { Observable, of } from 'rxjs';

export interface GeoLocationCoords {
  lat: number;
  lon: number;
}

export const DEFAULT_POSITION = { lat: 44.4598629, lon: 11.1955072 };

/**
 * Return a cold observable with user or default position
 * @param enabled
 */
export const getGeoPosition = (enabled: boolean): Observable<GeoLocationCoords> => {
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
