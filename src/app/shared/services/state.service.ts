import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private _atBottom = signal<boolean>(false);

  get atBottom() {
    return this._atBottom.asReadonly();
  }

  setAtBottom(v: boolean) {
    this._atBottom.set(v);
  }
}
