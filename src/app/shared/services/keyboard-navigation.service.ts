import { DestroyRef, inject, Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class KeyboardNavigationService {
  private _mouseMoveEvent = fromEvent(window, 'pointermove');
  private _keyEvent = fromEvent(window, 'keydown');
  private _destroyRef = inject(DestroyRef);

  init() {
    this._keyEvent.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
      document.body.classList.add('key-navigation');
    });

    this._mouseMoveEvent.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
      document.body.classList.remove('key-navigation');
    });
  }
}
