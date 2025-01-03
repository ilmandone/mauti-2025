import {DestroyRef, inject, Injectable, signal} from '@angular/core';
import {debounceTime, fromEvent} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService {

  private _destroyRef = inject(DestroyRef)

  private _getScreenSize = () => {
    return getComputedStyle(document.documentElement).getPropertyValue('--screen-size');
  }

  private _screenSize = signal<string>('')

  get screenSize() {
    return this._screenSize.asReadonly()
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
