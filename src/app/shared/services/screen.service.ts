import { DestroyRef, inject, Injectable, Signal, signal } from '@angular/core';
import { debounceTime, fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ScreenService {
  private _destroyRef = inject(DestroyRef);
  private _vh = signal<number>(0);

  private _setVH(): void {
    this._vh.set(window.innerHeight);
    console.log('asldkjaslkdj');
    document.documentElement.style.setProperty('--vh', `${this._vh() * 0.01}px`);
  }

  get vh(): Signal<number> {
    return this._vh.asReadonly();
  }

  init() {
    fromEvent(window, 'resize')
      .pipe(takeUntilDestroyed(this._destroyRef), debounceTime(100))
      .subscribe(() => {
        this._setVH();
      });

    this._setVH();
  }
}
