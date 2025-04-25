import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private _atBottom = signal<boolean>(false);
  private _atTop = signal<boolean>(true);
  private _isTouch = navigator.maxTouchPoints !== 0;

  get atTop() {
    return this._atTop.asReadonly();
  }

  get atBottom() {
    return this._atBottom.asReadonly();
  }

  get isTouch() {
    return this._isTouch;
  }

  setAtBottom(v: boolean) {
    this._atBottom.set(v);
  }

  setAtTop(v: boolean) {
    this._atTop.set(v);
  }
}
