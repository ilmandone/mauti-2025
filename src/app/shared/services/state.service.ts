import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private _atBottom = signal<boolean>(false);
  private _atTop = signal<boolean>(true);

  get atTop() {
    return this._atTop.asReadonly();
  }

  get atBottom() {
    return this._atBottom.asReadonly();
  }

  setAtBottom(v: boolean) {
    this._atBottom.set(v);
  }

  setAtTop(v: boolean) {
    this._atTop.set(v);
  }
}
