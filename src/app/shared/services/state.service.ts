import { inject, Injectable, signal } from '@angular/core';
import { ActivatedRoute, Data, NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private _router = inject(Router);
  private _activateRoute = inject(ActivatedRoute);

  private _loaded = signal<boolean>(false);
  private _section = toSignal<string>(
    this._router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() =>
        this._getSectionFromData(this._activateRoute.snapshot.firstChild?.data),
      ),
      startWith(
        this._getSectionFromData(this._activateRoute.snapshot.firstChild?.data),
      ),
    ),
  );

  /**
   * Return section value from Data or empty string
   * @param data
   * @private
   */
  private _getSectionFromData(data: Data | undefined) {
    if (data && data['section']) return data['section'];
    else return '';
  }

  get loaded() {
    return this._loaded.asReadonly();
  }

  setLoaded(v: boolean) {
    this._loaded.set(v);
  }

  get section() {
    return this._section;
  }
}
