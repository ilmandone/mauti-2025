import { inject, Injectable, signal } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private _router = inject(Router);
  private _activateRoute = inject(ActivatedRoute);

  //#region Signals

  /**
   * Main load state
   * @private
   */
  private _ready = signal<boolean>(false);

  /**
   * Get section information from route's data
   * @private
   */
  private _section = toSignal<string>(
    this._router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this._getSectionFromData(this._activateRoute.snapshot)),
      startWith(this._getSectionFromData(this._activateRoute.snapshot))
    )
  );

  //#endregion

  /**
   * Follow activated routes to the leaf and get section value
   * @private
   * @param ar
   */
  private _getSectionFromData(ar: ActivatedRouteSnapshot): string {
    if (ar.children.length > 0) {
      return this._getSectionFromData(ar.children[0]);
    } else {
      return ar.data['section'];
    }
  }

  get ready() {
    return this._ready.asReadonly();
  }

  setReady(v: boolean) {
    this._ready.set(v);
  }

  get section() {
    return this._section;
  }
}
