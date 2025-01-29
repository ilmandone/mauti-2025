import {DestroyRef, inject, Injectable, signal} from '@angular/core';
import {debounceTime, fromEvent} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

type ScreenSizes = 't' | 'tl' | 'd' | 'dm' | 'dl' | 'dxl'

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService {

  private _destroyRef = inject(DestroyRef)
  private _screenSizes = ['t', 'tl', 'd', 'dm', 'dl', 'dxl']

  private _getScreenSize = () => {
    return getComputedStyle(document.documentElement).getPropertyValue('--screen-size');
  }

  private _screenSize = signal<string>('')

  get screenSize() {
    return this._screenSize.asReadonly()
  }

  relatedTo(s: ScreenSizes) {
    const sIndex = this._screenSizes.indexOf(s)
    const cIndex = this._screenSizes.indexOf(this._screenSize().trim())

    if (sIndex === cIndex) return 'equal'
    if (sIndex < cIndex) return 'before'
    return 'after'
  }

  init() {

    this._screenSize.set(this._getScreenSize() || 'm')

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
