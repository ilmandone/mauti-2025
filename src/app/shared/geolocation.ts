import { Observable, of } from 'rxjs';

export interface GeoLocationCoords {
  lat: number;
  lon: number;
}

/**
 * Return a cold observable that return user or default position
 * @param enabled
 */
export const getGeolocationCoords = (enabled: boolean): Observable<GeoLocationCoords> => {
  const geolocation = navigator.geolocation;
  const defaultPosition = { lat: 44.4598629, lon: 11.1955072 };
  const noPosMsg = 'Use default position';

  if (!navigator.geolocation || !enabled) {
    return of(defaultPosition);
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
        subscriber.next(defaultPosition);
        subscriber.complete();
      }
    );
  });
};
