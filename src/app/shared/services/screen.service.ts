import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { debounceTime, fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ScreenOrientation } from '../commons';

/**
 * Export screen sizes type and values
 */
const _screenSizes = ['t', 'tl', 'd', 'dm', 'dl', 'dxl'] as const;
export type ScreenSize = (typeof _screenSizes)[number];
export const SCREEN_SIZES: ScreenSize[] = [..._screenSizes];

/**
 * Service that return the actual screen size from the css var --screen-size
 */

@Injectable({
  providedIn: 'root',
})
export class ScreenService {
  private _destroyRef = inject(DestroyRef);
  private _screenSizes = SCREEN_SIZES;

  private _screenSize = signal<ScreenSize | null>(null);
  private _screenOrientation = signal<ScreenOrientation | null>(null);

  private _getScreenSize = () => {
    return getComputedStyle(document.documentElement).getPropertyValue('--screen-size').trim() as ScreenSize;
  };

  private _getScreenOrientation(): ScreenOrientation {
    return window.innerWidth / window.innerHeight > 1 ? 'horizontal' : 'vertical';
  }

  get screenSize() {
    return this._screenSize.asReadonly();
  }

  get screenOrientation() {
    return this._screenOrientation.asReadonly();
  }

  relatedTo(s: ScreenSize): 'equal' | 'after' | 'before' {
    const sIndex = this._screenSizes.indexOf(s);
    const cIndex = this._screenSizes.indexOf(this._screenSize()!);

    if (sIndex === cIndex) return 'equal';
    if (sIndex < cIndex) return 'before';
    return 'after';
  }

  init() {
    this._screenSize.set(this._getScreenSize());
    this._screenOrientation.set(this._getScreenOrientation());

    fromEvent(window, 'resize')
      .pipe(takeUntilDestroyed(this._destroyRef), debounceTime(100))
      .subscribe(() => {
        const sz = this._getScreenSize() || 'm';
        if (sz !== this._screenSize()) this._screenSize.set(sz);
        this._screenOrientation.set(this._getScreenOrientation());
      });
  }
}
