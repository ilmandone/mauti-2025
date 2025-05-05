import { computed, DestroyRef, inject, Injectable, Signal, signal } from '@angular/core';
import { debounceTime, fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const _screenSizes = ['t', 'tl', 'd', 'dm', 'dl', 'dxl'] as const;
export type ScreenSize = (typeof _screenSizes)[number];
export const SCREEN_SIZE: ScreenSize[] = [..._screenSizes];

@Injectable({
  providedIn: 'root',
})
export class ScreenService {
  private _destroyRef = inject(DestroyRef);
  private _size = signal<ScreenSize | null>(null);
  private _vh = signal<number>(0);

  private _setScreenSize() {
    const c = getComputedStyle(document.documentElement).getPropertyValue('--screen-size').trim() as ScreenSize;
    this._size.set(c);
  }

  private _setVH(): void {
    this._vh.set(window.innerHeight);
    document.documentElement.style.setProperty('--vh', `${this._vh() * 0.01}px`);
  }

  get size(): Signal<ScreenSize | null> {
    return this._size.asReadonly();
  }

  get vh(): Signal<number> {
    return this._vh.asReadonly();
  }

  relativeTo(size: ScreenSize): Signal<'before' | 'after' | 'equal' | null> {
    return computed<'before' | 'after' | 'equal' | null>(() => {
      const sz = this._size();

      if (!sz) return null;

      const refIndex = SCREEN_SIZE.indexOf(size);
      const currentIndex = SCREEN_SIZE.indexOf(sz);
      return currentIndex < refIndex ? 'before' : currentIndex > refIndex ? 'after' : 'equal';
    });
  }

  init() {
    fromEvent(window, 'resize')
      .pipe(takeUntilDestroyed(this._destroyRef), debounceTime(100))
      .subscribe(() => {
        this._setScreenSize();
        this._setVH();
      });

    this._setScreenSize();
    this._setVH();
  }
}
