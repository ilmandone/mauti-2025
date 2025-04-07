import { inject, Injectable, NgZone } from '@angular/core';
import Lenis from 'lenis';

@Injectable({
  providedIn: 'root',
})
export class LenisService {
  private _ngZone = inject(NgZone);

  private _lenis: Lenis | null = null;

  get lenis() {
    return this._lenis;
  }

  init() {
    this._ngZone.runOutsideAngular(() => {
      this._lenis = new Lenis({
        autoRaf: true,
      });
    });
  }
}
