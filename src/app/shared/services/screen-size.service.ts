import {DestroyRef, inject, Injectable, signal} from '@angular/core';
import {debounceTime, fromEvent} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

/**
 * Export screen sizes type and values
 */
const _screenSizes = ['t', 'tl', 'd', 'dm', 'dl', 'dxl'] as const;
export type ScreenSize = typeof _screenSizes[number]
export const SCREEN_SIZE: ScreenSize[] = [..._screenSizes]

/**
 * Service that return the actual screen size from the css var --screen-size
 */

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService {

  private _destroyRef = inject(DestroyRef)
  private _screenSizes = SCREEN_SIZE

  private _getScreenSize = () => {
    return getComputedStyle(document.documentElement).getPropertyValue('--screen-size') as ScreenSize;
  }

  private _screenSize = signal<ScreenSize | null>(null)

  get screenSize() {
    return this._screenSize.asReadonly()
  }

  relatedTo(s: ScreenSize): 'equal' | 'after' | 'before' {
    const sIndex = this._screenSizes.indexOf(s)
    const cIndex = this._screenSizes.indexOf(this._screenSize()!)

    if (sIndex === cIndex) return 'equal'
    if (sIndex < cIndex) return 'before'
    return 'after'
  }

  init() {

    this._screenSize.set(this._getScreenSize())

    fromEvent(window, 'resize')
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        debounceTime(100)
      )
      .subscribe(() => {
        const sz = this._getScreenSize() || 'm'

        if (sz !== this._screenSize()) this._screenSize.set(sz)
      })
  }
}
